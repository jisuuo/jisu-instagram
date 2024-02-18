import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { User } from '@user/entities/user.entity';

@Entity()
export class Privacy extends BaseEntity {
  @OneToOne(() => User)
  public user: User;

  @Column({})
  isFourteenOver: boolean;

  @Column({
    default: false,
  })
  isAgreement: boolean;

  @Column({
    default: false,
  })
  isPersonalInfo: boolean;

  @Column({
    default: false,
  })
  isMarketingAgree: boolean;

  @Column({
    default: false,
  })
  isEventAgree: boolean;
}
