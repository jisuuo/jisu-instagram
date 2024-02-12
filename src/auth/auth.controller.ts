import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../user/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { LocalUserGuard } from './guard/local-user.guard';
import { RequestUser } from './interface/request-user.interface';
import { BaseEntity } from '../common/base.entity';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 유저 가입
  @Post()
  @ApiOperation({ summary: '유저 생성' })
  @ApiParam({ name: 'phone', required: true, description: '유저 핸드폰 번호' })
  @ApiParam({ name: 'nickname', required: true, description: '유저 닉네임' })
  @ApiParam({ name: 'password', required: true, description: '유저 비밀번호' })
  @ApiParam({ name: 'name', required: true, description: '유저 이름' })
  @ApiParam({ name: 'email', required: true, description: '유저 이메일' })
  @ApiCreatedResponse({ description: '유저 생성', type: CreateUserDto })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.createUser(createUserDto);
  }

  // 유저 로그인
  @Post('login')
  @ApiOperation({ summary: '유저 로그인' })
  @ApiParam({ name: 'password', required: true, description: '유저 비밀번호' })
  @ApiParam({ name: 'email', required: true, description: '유저 이메일' })
  @ApiCreatedResponse({ description: '유저 로그인', type: User })
  @UseGuards(LocalUserGuard)
  async loginUser(@Req() req: RequestUser) {
    return req.user;
  }

  // 유저 프로필 가져오기 [1명, by userId]
  @Get()
  @ApiOperation({
    summary: '유저 프로필 가져오기',
  })
  @ApiParam({
    name: 'userID',
    required: true,
    description: '유저 아이디',
  })
  @ApiCreatedResponse({
    description: '유저 프로필 가져오기',
  })
  async getUser(@Body('userId') userId: string) {
    return await this.authService.getUser(userId);
  }
}
