import { v4 as uuidV4 } from 'uuid';
import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';

import Profile from './Profile.entity';
import Account from './Account.entity';

@Entity('Subscription')
export default class Subscription extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar')
  card: string;

  @Column('varchar', { default: '' })
  expireDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    (_type: any) => Profile,
    (profile: Profile) => profile.subscription)
  profile: Profile;

  @ManyToOne(
    (_type: any) => Profile,
    (profile: Profile) => profile.subscription,
    {
      eager: true,
      onDelete: 'CASCADE',
    }
  )
  @JoinColumn()
  mentee: Profile;

  @ManyToOne(
    (_type: any) => Profile,
    (profile: Profile) => profile.subscription,
    {
      eager: true,
      onDelete: 'CASCADE',
    }
  )
  @JoinColumn()
  mentor: Profile;

  @ManyToOne(
    (_type: any) => Account,
    (account: Account) => account.subscription,
    {
      eager: true,
      onDelete: 'CASCADE',
    }
  )
  @JoinColumn()
  account: Account;

  @BeforeInsert()
  addId() {
    this.id = uuidV4();
  }
}
