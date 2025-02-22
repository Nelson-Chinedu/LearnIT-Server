import { v4 as uuidV4 } from 'uuid';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToOne,
  OneToMany,
} from 'typeorm';

import Profile from './Profile';
import Course from './Course';
import Subscription from './subscription';

export enum UserRole {
  MENTOR = 'mentor',
  MENTEE = 'mentee',
}

@Entity('Account')
export default class Account extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, unique: true })
  email: string;

  @Column('varchar', { length: 255 })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.MENTEE })
  role: UserRole;

  @Column('boolean', { default: false })
  blocked: boolean;

  @Column('boolean', { default: false })
  verified: boolean;

  @Column('boolean', { default: false })
  isSubscribed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne((_type: any) => Profile, (profile: Profile) => profile.account)
  profile: Profile;

  @OneToMany((_type: any) => Course, (course: Course) => course.account)
  course: Course;

  @OneToMany((_type: any) => Subscription, (subscription: Subscription) => subscription.account)
  subscription: Subscription;

  @BeforeInsert()
  addId() {
    this.id = uuidV4();
  }
}
