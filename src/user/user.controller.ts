import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '유저 생성', description: '유저 생성' })
  @ApiCreatedResponse({ description: '유저 생성', type: User })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Post('upload-profileImg')
  @ApiOperation({
    summary: '유저 프로필 이미지 업로드',
  })
  @ApiParam({ name: 'file', required: true, description: '파일' })
  @ApiCreatedResponse({ description: '유저 프로필 이미지 업로드' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileImg(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
