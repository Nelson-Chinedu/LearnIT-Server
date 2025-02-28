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
} from 'typeorm';

import Category from './Category.entity';
import Profile from './Profile.entity';

@Entity('Resource')
export default class Resource extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    (_type: any) => Category,
    (category: Category) => category.resource,
    {
      eager: true,
      onDelete: 'CASCADE',
    }
  )
  @JoinColumn()
  category: Category;

  @ManyToOne((_type: any) => Profile, (profile: Profile) => profile.resource, {
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
