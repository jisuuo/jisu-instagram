import { Column } from 'typeorm';

export class CreateUserDto {
  // 유저 이메일
  email: string;

  // 유저 이름
  name: string;

  // 유저 비밀번호
  password: string;

  // 유저 닉네임
  nickname: string;

  // 유저 휴대폰번호
  phone: string;
}
