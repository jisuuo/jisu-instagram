import {
  Body,
  Controller,
  Get,
  Post,
  Headers,
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
import {
  AccessTokenGuard,
  RefreshTokenGuard,
} from './guard/bearer-token.guard';

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
  registerEmail(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerWithEmail(createUserDto);
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
}
