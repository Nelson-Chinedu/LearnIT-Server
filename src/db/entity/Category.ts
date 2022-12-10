import { v4 as uuidV4 } from 'uuid';
import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import Account from './Account';
import Resource from './Resource';

@Entity('Category')
export default class Category extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    (_type: any) => Resource,
    (resource: Resource) => resource.category
  )
  resource: Resource;

  @ManyToOne((_type: any) => Account, (account: Account) => account.category, {
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
