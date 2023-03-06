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
  OneToMany,
} from 'typeorm';

import Account from './Account';
import Course from './Course';
import Bio from './Bio';
import Enroll from './Enroll';
import Category from './Category';
import Resource from './Resource';
import Subscription from './subscription';
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

  @OneToOne((_type: any) => Bio, (bio: Bio) => bio.profile)
  bio: Bio;

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

  @OneToMany((_type: any) => Enroll, (enroll: Enroll) => enroll.profile)
  enroll: Enroll;

  @OneToMany((_type: any) => Category, (category: Category) => category.profile)
  category: Category;

  @OneToMany((_type: any) => Resource, (resource: Resource) => resource.profile)
  resource: Resource;

  @OneToMany(
    (_type: any) => Subscription,
    (subscription: Subscription) => subscription.profile
  )
  subscription: Subscription;

  @BeforeInsert()
  addId() {
    this.id = uuidV4();
  }
}
