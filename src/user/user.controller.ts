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

  @Post('upload/profileImg')
  @ApiOperation({
    summary: '유저 프로필 이미지 업로드',
  })
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

  @Post('update/profile/:id')
  @ApiOperation({
    summary: '유저 프로필 정보 수정',
  })
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiCreatedResponse({ description: '유저 프로필 수정' })
  async updateProfile(
    @Req() req: RequestUser,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const { user } = req;

    let imgPath: string;

    /// 파일이 있는 경우
    if (file) {
      const diskPath = file.path.replace(
        this.configService.get('ATTACH_SAVE_PATH'),
        '',
      );
      imgPath = diskPath.replace(/\\/gi, '/');
      /// 파일이 없는 경우
    } else {
      imgPath = user.profileImg;
    }

    return await this.userService.updateProfile(
      user.id,
      updateUserDto.password,
      updateUserDto.nickname,
      imgPath,
    );
  }
}
