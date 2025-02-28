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
  Index,
} from 'typeorm';

import Account from './Account-entity';
import Course from './Course-entity';
import Bio from './Bio-entity';
import Enroll from './Enroll-entity';
import Category from './Category-entity';
import Resource from './Resource-entity';
import Subscription from './Subscription-entity';
@Entity('Profile')
export default class Profile extends BaseEntity {
  @Index({unique: true})
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

  @Index({unique: true})
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
  enroll: Enroll[];

  @OneToMany((_type: any) => Category, (category: Category) => category.profile)
  category: Category[];

  @OneToMany((_type: any) => Resource, (resource: Resource) => resource.profile)
  resource: Resource[];

  @OneToMany(
    (_type: any) => Subscription,
    (subscription: Subscription) => subscription.profile
  )
  subscription: Subscription[];

  @BeforeInsert()
  addId() {
    this.id = uuidV4();
  }
}
