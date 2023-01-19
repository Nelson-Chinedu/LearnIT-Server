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
} from 'typeorm';

import Profile from './Profile';

@Entity('Bio')
export default class Bio extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar')
  mentorBio: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

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
