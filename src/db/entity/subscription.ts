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

import Profile from './Profile';

@Entity('Subscription')
export default class Subscription extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar')
  card: string;

  @Column('varchar')
  expireDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    (_type: any) => Profile,
    (profile: Profile) => profile.subscription,
    {
      eager: true,
      onDelete: 'CASCADE',
    }
  )
  // this column maps to the mentor profile id
  @JoinColumn()
  profile: Profile;

  @ManyToOne(
    (_type: any) => Profile,
    (profile: Profile) => profile.subscription,
    {
      eager: true,
      onDelete: 'CASCADE',
    }
  )
  // this column maps to the mentor profile id
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
  // this column maps to the mentor profile id
  @JoinColumn()
  mentor: Profile;

  @BeforeInsert()
  addId() {
    this.id = uuidV4();
  }
}
