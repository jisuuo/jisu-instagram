import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  // 유저 이메일
  @ApiProperty()
  email: string;

  // 유저 이름
  @ApiProperty()
  name: string;

  // 유저 비밀번호
  @ApiProperty()
  password: string;

  // 유저 닉네임
  @ApiProperty()
  nickname: string;

  // 유저 휴대폰번호
  @ApiProperty()
  phone: string;
}
