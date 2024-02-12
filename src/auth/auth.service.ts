import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ProviderEnum } from '../user/entities/provider.enum';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  // 유저 가입
  async createUser(createUserDto: CreateUserDto) {
    return await this.userService.createUser({
      ...createUserDto,
      provider: ProviderEnum.LOCAL,
    });
  }

  // 유저 로그인
  async loginUser(loginUserDto: LoginUserDto) {
    // 이메일 유무 확인
    const user = await this.userService.validateEmail(loginUserDto.email);
    // 비밀번호 확인
    const isMatched = await user.checkPassword(loginUserDto.password);
    if (!isMatched) {
      throw new HttpException('Password do not matched', HttpStatus.CONFLICT);
    }
    return user;
  }

  // 유저 프로필 가져오기 [1명, by userId]
  async getUser(userId: string) {
    return await this.userService.getUser(userId);
  }
}
