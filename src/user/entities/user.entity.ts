import { BaseEntity } from '../../common/base.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { ProviderEnum } from './provider.enum';
import * as bcrypt from 'bcryptjs';
import * as gravatar from 'gravatar';
import { InternalServerErrorException } from '@nestjs/common';

@Entity()
@ApiTags('UserEntity')
export class User extends BaseEntity {
  // 유저 가입 이메일
  @Column({
    unique: true,
  })
  @ApiProperty()
  public email: string;

  // 유저 이름
  @Column({
    nullable: true,
  })
  @ApiProperty()
  public name?: string;

  // 유저 비밀번호
  @Column({
    nullable: true,
  })
  @ApiProperty()
  public password?: string;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  public profileImg?: string;

  @BeforeInsert()
  async processUserCredentials() {
    try {
      if (ProviderEnum.LOCAL !== this.provider) {
        return;
      }
      // 이메일 가입자 인 경우 기본 프로필 이미지 저장
      this.profileImg = gravatar.url(this.email, {
        s: '200',
        r: 'pg',
        d: 'mm',
        protocol: 'https',
      });
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async hashPassword(newPassword: string): Promise<string> {
    const saltValue = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(newPassword, saltValue);
    return this.password;
  }

  // 유저 닉네임
  @Column({
    nullable: true,
  })
  @ApiProperty()
  public nickname?: string;

  // 유저 휴대폰번호
  @Column({
    nullable: true,
  })
  @ApiProperty()
  public phone?: string;

  // 유저 가입경로 [이메일, 구글, 카카오, 네이버]
  @Column({
    type: 'enum',
    enum: ProviderEnum,
    default: ProviderEnum.LOCAL,
  })
  @ApiProperty()
  public provider: ProviderEnum;

  @Column({
    default: false,
  })
  public isVerified: boolean;

  async checkPassword(inputPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(inputPassword, this.password);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }
}
