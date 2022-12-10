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
import Bio from './Bio';
import Course from './Course';
import Resource from './Resource';
import Category from './Category';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne((_type: any) => Profile, (profile: Profile) => profile.account)
  profile: Profile;

  @OneToOne((_type: any) => Bio, (bio: Bio) => bio.account)
  bio: Bio;

  @OneToMany((_type: any) => Course, (course: Course) => course.account)
  course: Course;

  @OneToMany((_type: any) => Category, (category: Category) => category.account)
  category: Category;

  @OneToMany((_type: any) => Resource, (resource: Resource) => resource.account)
  resource: Resource;

  @BeforeInsert()
  addId() {
    this.id = uuidV4();
  }
}
