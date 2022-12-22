import { v4 as uuidV4 } from 'uuid';
import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Account from './Account';
import Profile from './Profile';

@Entity('Course')
export default class Course extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('money')
  price: string;

  @Column('bigint')
  count: number;

  @Column('varchar', { array: true })
  video: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne((_type: any) => Account, (account: Account) => account.course, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  account: Account;

  @ManyToOne((_type: any) => Profile, (profile: Profile) => profile.course, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  profile: Profile;

  @BeforeInsert()
  addId() {
    this.id = uuidV4();
  }
}
