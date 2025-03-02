import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import Task from './Task.entity';

@Entity('Feedback')
export default class Feedback extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('text')
  feedback: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @ManyToOne((_type: any) => Task, (task: Task) => task.feedback, {
    eager: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  task: Task

  @BeforeInsert()
  addId() {
    this.id = uuidV4();
  }
}
