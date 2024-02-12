import { BaseEntity } from '../../common/base.entity';
import { Column, Entity } from 'typeorm';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { ProviderEnum } from './provider.enum';

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
  @Column()
  @ApiProperty()
  public name: string;

  // 유저 비밀번호
  @Column()
  @ApiProperty()
  public password: string;

  // 유저 닉네임
  @Column()
  @ApiProperty()
  public nickname: string;

  // 유저 휴대폰번호
  @Column()
  @ApiProperty()
  public phone: string;

  // 유저 가입경로 [이메일, 구글, 카카오, 네이버]
  @Column({
    type: 'enum',
    enum: ProviderEnum,
    default: ProviderEnum.LOCAL,
  })
  @ApiProperty()
  public provider: ProviderEnum;
}
