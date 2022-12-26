import { v4 as uuidV4 } from 'uuid';
import {
  BaseEntity,
  Column,
  PrimaryColumn,
  Entity,
  OneToOne,
  JoinColumn,
  BeforeInsert,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

import Account from './Account';
import Course from './Course';
@Entity('Profile')
export default class Profile extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar')
  firstname: string;

  @Column('varchar')
  lastname: string;

  @Column('varchar')
  phone: string;

  @Column('varchar')
  city: string;

  @Column('varchar')
  state: string;

  @Column('varchar')
  zipCode: string;

  @Column('varchar')
  address: string;

  @Column('varchar')
  country: string;

  @Column('varchar', { default: '' })
  picture: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne((_type: any) => Account, (account: Account) => account.profile, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  account: Account;

  @OneToOne((_type: any) => Course, (course: Course) => course.profile, {
    onDelete: 'CASCADE',
  })
  course: Course;

  @BeforeInsert()
  addId() {
    this.id = uuidV4();
  }
}
