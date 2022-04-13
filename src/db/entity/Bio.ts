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

import Account from './Account';

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

  @OneToOne((_type: any) => Account, (account: Account) => account.bio, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  account: Account;

  @BeforeInsert()
  addId() {
    this.id = uuidV4();
  }
}
