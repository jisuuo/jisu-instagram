import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessTokenGuard } from '../auth/guard/bearer-token.guard';
import { RequestUser } from '../auth/interface/request-user.interface';
import { ConfigService } from '@nestjs/config';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @Post('upload-profileImg')
  @ApiOperation({
    summary: '유저 프로필 이미지 업로드',
  })
  @ApiCreatedResponse({ description: '유저 프로필 이미지 업로드' })
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AccessTokenGuard)
  async uploadProfileImg(
    @Req() req: RequestUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { user } = req;

    const diskPath = file.path.replace(
      this.configService.get('ATTACH_SAVE_PATH'),
      '',
    );

    const imgInfo = {
      fileName: file.originalname,
      path: diskPath.replace(/\\/gi, '/'),
      size: file.size,
    };

    // 프로필 이미지 업데이트
    await this.userService.updateProfileImg(user.id, imgInfo.path);
    return imgInfo;
  }

  // 프로필 업데이트
  @Post('update/profile/:id')
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiCreatedResponse({ description: '유저 프로필 수정' })
  async updateProfile(
    @Req() req: RequestUser,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const { user } = req;

    const diskPath = file.path.replace(
      this.configService.get('ATTACH_SAVE_PATH'),
      '',
    );

    const imgInfo = {
      fileName: file.originalname,
      path: diskPath.replace(/\\/gi, '/') ?? user.profileImg,
      size: file.size,
    };

    return await this.userService.updateProfile(
      user.id,
      updateUserDto.password,
      updateUserDto.nickname,
      imgInfo.path,
    );
  }
}
