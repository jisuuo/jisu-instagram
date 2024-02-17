import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ required: false, description: '유저 패스워드' })
  password?: string;

  @ApiProperty({ required: false, description: '유저 닉네임' })
  nickname?: string;
}
