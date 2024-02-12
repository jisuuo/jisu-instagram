import { BaseEntity } from '../../common/base.entity';
import { Column } from 'typeorm';

export class User extends BaseEntity {
  // 유저 가입 이메일
  @Column()
  public email: string;

  // 유저 이름
  @Column()
  public name: string;

  // 유저 비밀번호
  @Column()
  public password: string;

  // 유저 닉네임
  @Column()
  public nickname: string;

  // 유저 휴대폰번호
  @Column()
  public phone: string;
}
