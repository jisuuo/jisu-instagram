import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { RefreshTokenGuard } from '@auth/guard/bearer-token.guard';
import { AuthService } from '@auth/auth.service';
import { BasicTokenGuard } from '@auth/guard/basic-token.guard';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { GoogleUserGuard } from '@auth/guard/google-user.guard';
import { RequestUser } from '@auth/interface/request-user.interface';
import { NaverUserGuard } from '@auth/guard/naver-user.guard';
import { ChangePasswordDto } from '@auth/dto/change-password.dto';

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
    console.log(user);
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

  @Post(`send/email/reset-password/new-password/:email`)
  @ApiOperation({
    summary: '비밀번호 초기화 이메일 전송',
  })
  async resetNewPassword(
    @Param('email') email: string,
    @Body('otp') otp: string,
  ) {
    return await this.authService.confirmOTP(email, otp);
  }

  @Post('email/verify')
  @ApiOperation({
    summary: '이메일 본인인증',
  })
  async verifyEmail(@Body('token') token: string) {
    const email = await this.authService.decodeConfirmationToken(token);
    await this.authService.confirmEmail(email);
    return 'Success';
  }
}

// 1. 회원가입과 동시 email verification 전송
// 2. Token을 담아서 보냄
// 3. token을 풀어서 token안에 email 찾아서 업데이트 (isMark)
