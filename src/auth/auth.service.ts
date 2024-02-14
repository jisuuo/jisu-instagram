import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ProviderEnum } from '../user/entities/provider.enum';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 토큰을 사용하게 되는 방식
   *
   * 1) 사용자가 로그인 또는 회원가입을 진행하면
   *    accessToken, refreshToken 발급받는다.
   * 2) 로그인 할때는 Basic 토큰과 함께 요청을 보낸다.
   *    Basic 토큰은 '이메일:비밀번호'를 Base64로 인코딩한 형태
   *    예) {authorization: 'Basic {token}'}
   * 3) 아무나 접근 할 수 없는 정보 {private route}를 접근할 때는
   *    accessToken을 Header에 추가해서 요청과 함께 보낸다.
   *    예) {authorization: 'Bearer {token}'}
   * 4) 토큰과 요청을 함께 받은 서버는 토큰 검증을 통해 현재 요청을 보냄
   *    사용자가 누구인지 알 수 있다.
   *    예를 들어서 현재 로그인한 사용자가 작성한 포스트만 가져오려면
   *    토큰의 sub 값에 입력돼있는 사용자의 포스트만 따로 필터링 할 수 있다.
   *    특정 사용자의 토큰이 없다면 다른 사용자의 데이터를 접근 못한다.
   * 5) 모든 토큰은 만료 기간이 있다. 만료 기간이 지나면 새로 토큰을 발급 받아야한다.
   *    그렇지 않으면 jwtService.verify()에서 인증이 통과 안된다.
   *    그러니 access 토큰을 새로 발급 받을 수 있는 /auth/token/access와 refresh 토큰을 새로 발급 받을 수 있는 /auth/token/refresh가 필요하다.
   * 6) 토큰이 만료되면 각각의 토큰을 새로 발급 받을 수 있는 엔드포인트에 요청을 해서 새로운 토큰을 발급받고 새로운 토큰을 사용해서 private route에 접근한다.
   *
   */

  /**
   * Header 로부터 토큰을 받을 때
   * {authorization: 'Basic {token}'} '이메일:비밀번호'를 Base64로 인코딩한 형태
   * {authorization: 'Bearer {token}'} 발급받은 token 그대로
   */
  extractTokenFromHeader(header: string, isBearer: boolean) {
    // 'Basic {token}'
    // [Basic, {token}]
    // 'Bearer {token}'
    // [Bearer, {token}]
    const splitToken = header.split(' ');

    // 클라이언트에서 잘못된 값을 가져오는 경우를 대비
    // split 후 리스트가 2개 이상 되는 경우 클라이언트에서 잘못 넘어오는 경우!
    const prefix = isBearer ? 'Bearer' : 'Basic';

    if (splitToken.length !== 2 || splitToken[0] !== prefix) {
      throw new UnauthorizedException('잘못된 유형의 토큰입니다!');
    }

    const token = splitToken[1];

    return token;
  }

  /**
   * Basic token
   *
   * 1) token -> email:password
   * 2) email:password ->
   * 3) {email: email, password: password}
   * */
  decodeBasicToken(base64String: string) {
    const decoded = Buffer.from(base64String, 'base64').toString('utf8'); //email:password

    const split = decoded.split(':'); //[email, password]

    if (split.length !== 2) {
      throw new UnauthorizedException('잘못된 유형의 토큰입니다!');
    }

    const email = split[0];
    const password = split[1];

    return {
      email,
      password,
    };
  }

  // 토큰 검증
  verifyToken(token: string) {
    return this.jwtService.verify(token, {
      secret: this.configService.get('JWT_SECRET_KEY'),
    });
  }

  // 토큰 재발급
  rotateToken(token: string, isRefreshToken: boolean) {
    const decoded = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_SECRET_KEY'),
    });

    /**
     * sub: uuid
     * email: email
     * type: 'access' | 'refresh'
     * */
    if (decoded.type !== 'refresh') {
      throw new UnauthorizedException(
        '토큰 재발급은 Refresh 토큰으로만 가능합니다!',
      );
    }

    return this.signToken(
      {
        ...decoded,
      },
      isRefreshToken,
    );
  }
  /**
   * 인증 기능들
   *
   * 1) registerWithEmail
   *    - email, nickname, password 입력받고 사용자를 생성.
   *    - 생성이 완료되면 accessToken, refreshToken 반환.
   *      회원가입 후 다시 로그인 해주세요 <- 과정 방지하기 위해서
   *
   * 2) loginWithEmail
   *    - email, password 입력하면 사용자 검증을 진행
   *    - 검증이 완료되면 accessToken, refreshToken 반환
   *
   * 3) loginUser
   *    - (1)과 (2)에서 필요한 accessToken과 refreshToken을 반환하는 로직
   *
   * 4) signToken
   *    - (3)에서 필요한 accessToken, refreshToken sign하는 로직
   *
   * 5) authenticateWithEmailAndPassword
   *    - (2)에서 로그인을 진행할 때 필요한 기본적인 검증 진행
   *    1. 사용자가 존재하는지 확인(email)
   *    2. 비밀번호가 맞는지 확인
   *    3. 모두 통과되면 찾은 사용자 정보 반환
   *    4. loginWithEmail에서 반환된 데이터를 기반으로 토큰 생성
   *
   * */

  /**
   * Payload에 들어갈 정보
   *
   * 1) email
   * 2) sub -> id
   * 3) type : 'accessToken' | 'refreshToken'
   *
   * */
  // 유저 가입
  async createUser(createUserDto: CreateUserDto) {
    return await this.userService.createUser({
      ...createUserDto,
      provider: ProviderEnum.LOCAL,
    });
  }

  // 유저 프로필 가져오기 [1명, by userId]
  async getUser(userId: string) {
    return await this.userService.getUser(userId);
  }

  signToken(user: Pick<User, 'email' | 'id'>, isRefreshToken: boolean) {
    const payload = {
      email: user.email,
      sub: user.id,
      type: isRefreshToken ? 'refresh' : 'access',
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET_KEY'),
      expiresIn: isRefreshToken ? 3600 : 300, // refreshToken: 3600s, accessToken: 300s
    });
  }

  async loginUser(user: Pick<User, 'email' | 'id'>) {
    const existingUser = await this.userService.getUserByEmail(user.email);
    return {
      user: existingUser,
      accessToken: this.signToken(user, false),
      refreshToken: this.signToken(user, true),
    };
  }

  // 유저 로그인
  async loginUsers(loginUserDto: LoginUserDto) {
    const user = await this.userService.validateEmail(loginUserDto.email);
    if (!user) {
      throw new NotFoundException('유저가 없습니다');
    }
    return user;
  }

  async authenticateWithEmailAndPassword(
    user: Pick<User, 'email' | 'password'>,
  ) {
    // 1. 사용자가 존재하는지 확인(email)
    // 2. 비밀번호가 맞는지 확인
    // 3. 모두 통과되면 찾은 사용자 정보 반환
    // 4. loginWithEmail에서 반환된 데이터를 기반으로 토큰 생성

    const existingUser = await this.userService.getUserByEmail(user.email);

    if (!existingUser) {
      throw new UnauthorizedException('존재하지 않는 사용자입니다!');
    }

    /**
     * 1) 입력된 비밀번호
     * 2) 기존해시 (hash) -> 사용자 정보에 저장돼있는 hash
     * */

    const passOk = await bcrypt.compare(user.password, existingUser.password);

    if (!passOk) {
      throw new UnauthorizedException('비밀번호가 틀렸습니다!');
    }

    return existingUser;
  }

  async loginWithEmail(user: Pick<User, 'email' | 'password'>) {
    const existingUser = await this.authenticateWithEmailAndPassword(user);

    // accessToken, refreshToken 발급
    return this.loginUser(existingUser);
  }

  async registerWithEmail(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, 10);

    const newUser = await this.userService.createUser({
      ...createUserDto,
      password: hash,
    });

    return this.loginUser(newUser);
  }

  async changePassword(email: string, changePasswordDto: ChangePasswordDto) {
    /**
     * 본인인증했을 시 기존 패스워드는 없애고 새로운 비밀번호로 업데이트
     * 1.이메일 인증
     * 2.본인인증 한 이메일로 아이디를 확인
     * 3.유저 있을시 유저의 비밀번호를 새로운 비밀번호 입력값으로 업데이트
     *
     **/
    const existingUser = await this.userService.getUserByEmail(email);
    if (!existingUser) {
      throw new NotFoundException('등록된 유저가 아닙니다');
    }
    const user = await this.userService.changePassword(
      existingUser.id,
      changePasswordDto.confirmPassword,
    );
    return user;
  }
}
