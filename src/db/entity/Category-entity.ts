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
  Index,
} from 'typeorm';

import Resource from './Resource-entity';
import Profile from './Profile-entity';

@Entity('Category')
export default class Category extends BaseEntity {
  @Index({ unique: true})
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
  resource: Resource[];

  @Index()
  @ManyToOne((_type: any) => Profile, (profile: Profile) => profile.category, {
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
