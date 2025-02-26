import { v4 as uuidV4 } from 'uuid';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  Index,
} from 'typeorm';

import Profile from './Profile';

@Entity('Bio')
export default class Bio extends BaseEntity {
  @Index()
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar')
  mentorBio: string;

  @Column('varchar', { default: '' })
  title: string;

  @Column('boolean', { default: false })
  availability: boolean;

  @Column('boolean', { default: false })
  acceptingMentees: boolean;

  @Column('varchar', { default: '' })
  company: string;

  @Column('varchar', { default: '' })
  yearsOfExperience: string;

  @Column('varchar', { default: 'Not set' })
  fee: string;

  @Column('varchar', { default: 'GMT+1' })
  timezone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Index()
  @OneToOne((_type: any) => Profile, (profile: Profile) => profile.bio, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  profile: Profile;

  @BeforeInsert()
  addId() {
    this.id = uuidV4();
  }
}
