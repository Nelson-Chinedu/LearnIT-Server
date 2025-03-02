import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import Profile from './Profile.entity';
import Feedback from './Feedback.entity';

export enum TaskStatus {
  TODO = 'Todo',
  PENDING = 'Pending',
  IN_REVIEW = 'In-Review',
  COMPLETED = 'Completed',
  SUBMITTED = 'Submitted',
  IN_PROGRESS = 'In-Progress',
}

@Entity('Task')
export default class Task extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  title: string;

  @Column({ default: '' })
  note: string;

  @Column('varchar', { length: 30 })
  dueDate: Date;

  @Column('varchar', {length: '255'})
  submissionUrl: string;

  @Column('text')
  supportingNote: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.TODO })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @ManyToOne((_type: any) => Profile, (profile: Profile) => profile.task, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  mentor: Profile;

  @ManyToOne((_type: any) => Profile, (profile: Profile) => profile.task, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  mentee: Profile;

  @OneToMany((_type: any) => Feedback, (feedback: Feedback) => feedback.task)
  feedback: Feedback[]

  @BeforeInsert()
  addId() {
    this.id = uuidV4();
  }
}
