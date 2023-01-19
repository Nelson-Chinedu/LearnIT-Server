import { v4 as uuidV4 } from 'uuid';
import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';

import Course from './Course';
import Profile from './Profile';

@Entity('Enroll')
export default class Enroll extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne((_type: any) => Profile, (profile: Profile) => profile.enroll, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  profile: Profile;

  @ManyToOne((_type: any) => Course, (course: Course) => course.enroll, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  course: Course;

  @BeforeInsert()
  addId() {
    this.id = uuidV4();
  }
}
