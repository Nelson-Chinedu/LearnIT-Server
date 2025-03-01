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
  Index,
} from 'typeorm';

import Profile from './Profile.entity';
import Course from './Course.entity';
import Subscription from './Subscription.entity';

export enum UserRole {
  MENTOR = 'mentor',
  MENTEE = 'mentee',
}

@Entity('Account')
export default class Account extends BaseEntity {
  @Index({unique: true})
  @PrimaryColumn('uuid')
  id: string;

  @Index({unique: true})
  @Column('varchar', { length: 255, unique: true })
  email: string;

  @Column('varchar', { length: 255 })
  password: string;

  @Index()
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
  subscription: Subscription[];

  @BeforeInsert()
  addId() {
    this.id = uuidV4();
  }
}
