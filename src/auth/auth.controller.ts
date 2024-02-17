import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { BasicTokenGuard } from './guard/basic-token.guard';
import { RefreshTokenGuard } from './guard/bearer-token.guard';
import { GoogleUserGuard } from './guard/google-user.guard';
import { RequestUser } from './interface/request-user.interface';
import { ChangePasswordDto } from './dto/change-password.dto';
import { NaverUserGuard } from './guard/naver-user.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token/access')
  @UseGuards(RefreshTokenGuard)
  @ApiOperation({
    summary: 'AccessToken 발급',
  })
  async createTokenAccess(@Headers('authorization') rawToken: string) {
    const token = this.authService.extractTokenFromHeader(rawToken, true);

    /**
     * {accessToken : {token}}
     */
    const newToken = this.authService.rotateToken(token, false);
    return {
      accessToken: newToken,
    };
  }

  @Post('token/refresh')
  @UseGuards(RefreshTokenGuard)
  @ApiOperation({
    summary: 'RefreshToken 발급',
  })
  async createTokenRefresh(@Headers('authorization') rawToken: string) {
    const token = this.authService.extractTokenFromHeader(rawToken, true);

    /**
     * {refreshToken : {token}}
     */
    const newToken = this.authService.rotateToken(token, true);
    return {
      refreshToken: newToken,
    };
  }

  @Post('login/email')
  @UseGuards(BasicTokenGuard)
  @ApiOperation({
    summary: '유저 이메일 로그인',
  })
  loginEmail(@Headers('authorization') rawToken: string) {
    // token = email:password => base64
    // ajfldjsaflkgjdlf => email:password
    const token = this.authService.extractTokenFromHeader(rawToken, false);
    const credentials = this.authService.decodeBasicToken(token);

    return this.authService.loginWithEmail(credentials);
  }

  @Post('register/email')
  @ApiOperation({
    summary: '유저 이메일 가입',
  })
  async registerEmail(@Body() createUserDto: CreateUserDto) {
    const newUser = this.authService.registerWithEmail(createUserDto);
    await this.authService.sendVerificationLink(createUserDto.email);
    return newUser;
  }

  // 유저 프로필 가져오기 [1명, by userId]
  @Get()
  @ApiOperation({
    summary: '유저 정보 가져오기',
  })
  @ApiParam({
    name: 'userID',
    required: true,
    description: '유저 아이디',
  })
  @ApiCreatedResponse({
    description: '유저 정보 가져오기',
  })
  async getUser(@Body('userId') userId: string) {
    return await this.authService.getUser(userId);
  }
  @Get('login/google')
  @UseGuards(GoogleUserGuard)
  @ApiOperation({
    summary: '구글 소셜 로그인',
  })
  async googleLogin() {
    return HttpStatus.OK;
  }

  @Get('google/callback')
  @UseGuards(GoogleUserGuard)
  @ApiOperation({
    summary: '구글 소셜 로그인 콜백',
  })
  async googleLoginCallback(@Req() req: RequestUser) {
    const { user } = req;
    const token = await this.authService.loginUser(user);
    return token;
  }

  @Get('login/naver')
  @UseGuards(NaverUserGuard)
  @ApiOperation({
    summary: '네이버 소셜 로그인',
  })
  async naverLogin() {
    return HttpStatus.OK;
  }

  @Get('naver/callback')
  @UseGuards(NaverUserGuard)
  @ApiOperation({
    summary: '네이버 소셜 로그인 콜백',
  })
  async naverLoginCallback(@Req() req: RequestUser) {
    const { user } = req;
    const token = await this.authService.loginUser(user);
    return token;
  }

  @Post('change-password')
  @ApiOperation({
    summary: '로그인 후 비밀번호 변경',
  })
  async changePassword(
    @Body('email') email: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return await this.authService.changePassword(email, changePasswordDto);
  }

  @Post('send/email/reset-password')
  @ApiOperation({
    summary: '로그인 전 비밀번호 초기화',
  })
  async resetPassword(@Body('userInfo') userInfo: string) {
    return await this.authService.resetPassword(userInfo);
  }

  @Post('email/verify')
  @ApiOperation({
    summary: '이메일 본인인증',
  })
  async verifyEmail(@Body('token') token: string) {
    const { email, password } = this.authService.decodeBasicToken(token);
    const user = await this.authService.findUser({
      email,
      password,
    });

    if (!user) {
      return await this.authService.loginWithEmail({
        email,
        password,
      });
    }
  }
}
