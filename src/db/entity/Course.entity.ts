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
  OneToMany,
} from 'typeorm';
import Account from './Account.entity';
import Profile from './Profile.entity';
import Enroll from './Enroll.entity';

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

  @Column('varchar')
  thumbnail: string;

  @Column('varchar')
  preview: string;

  @Column('text')
  objectives: string;

  @Column('text')
  faq: string;

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

  @OneToMany((_type: any) => Enroll, (enroll: Enroll) => enroll.course)
  enroll: Enroll[];

  @BeforeInsert()
  addId() {
    this.id = uuidV4();
  }
}
