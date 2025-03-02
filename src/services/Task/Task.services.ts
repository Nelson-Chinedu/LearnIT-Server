import { AppDataSource } from '../../index';

import { TaskStatus } from '../../db/entity/Task.entity';
import { Feedback, Task } from '../../db';

class TaskServices {
  async createTask(
    payload: {
      title: string;
      note: string;
      dueDate: string;
      status: TaskStatus;
      menteeId: Express.User | undefined;
    },
    id: Express.User | undefined
  ) {
    const { title, note, status, dueDate, menteeId } = payload;

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const newTask = AppDataSource.manager.create(Task, {
        title,
        note,
        dueDate,
        status,
        mentor: id,
        submissionUrl: '',
        supportingNote: '',
        mentee: menteeId,
      });
      await queryRunner.manager.save(newTask);

      const newSubmission = AppDataSource.manager.create(Feedback, {
        feedback: '',
        task: newTask,
      });
      await queryRunner.manager.save(newSubmission);
      await queryRunner.commitTransaction();
      return newTask;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error('An error occurred while creating task');
    } finally {
      await queryRunner.release();
    }
  }

  async taskFeedback({
    feedback,
    taskId,
  }: {
    feedback: string;
    taskId: Express.User | undefined;
  }) {
    try {
      const newFeedback = AppDataSource.manager.create(Feedback, {
        feedback,
        task: taskId,
      });
      await AppDataSource.manager.save(newFeedback);
      return newFeedback;
    } catch (error) {
      throw error;
    }
  }

  async getMentorTasks(
    mentorId: Express.User | undefined,
    menteeId: Express.User | undefined
  ) {
    try {
      const tasks = await AppDataSource.manager
        .getRepository(Task)
        .createQueryBuilder('task')
        .select([
          'task.id',
          'task.title',
          'task.dueDate',
          'task.createdAt',
          'task.status',
        ])
        .where('task.mentor = :mentorId', { mentorId })
        .andWhere('task.mentee = :menteeId', { menteeId })
        .orderBy('task.createdAt', 'DESC')
        .getMany();

      return tasks;
    } catch (error) {
      throw new Error('An error occurred while fetching tasks');
    }
  }

  async getMenteeSubmission(
    mentorId: Express.User | undefined,
    taskId: Express.User | undefined
  ) {
    try {
      const submission = await AppDataSource.manager
        .getRepository(Task)
        .createQueryBuilder('task')
        .select(['task.submissionUrl', 'task.supportingNote', 'task.title'])
        .where('task.mentor = :mentorId', { mentorId })
        .andWhere('task.id = :taskId', { taskId })
        .getOne();
      return submission;
    } catch (error) {
      throw new Error('An error occurred while fetching tasks');
    }
  }

  async getTaskFeedback(
    mentorId: Express.User | undefined,
    taskId: Express.User | undefined
  ) {
    try {
      const feedback = await AppDataSource.manager
        .getRepository(Feedback)
        .createQueryBuilder('feedback')
        .leftJoinAndSelect('feedback.task', 'task')
        .leftJoinAndSelect('task.mentor', 'mentor')
        .select([
          'task.id AS id',
          'feedback.feedback AS feedback',
          'mentor.id AS mentorId',
          'task.status AS status',
          'feedback.createdAt AS createdAt',
        ])
        .where('mentor.id = :mentorId', { mentorId })
        .andWhere('task.id = :taskId', { taskId })
        // this line filters out feedback column that is not empty
        .andWhere('feedback.feedback != :emptyFeedback', { emptyFeedback: '' })
        // this line filters out feedback column that is not null
        .andWhere('feedback.feedback IS NOT NULL')
        .getRawMany();
      return feedback;
    } catch (error) {
      throw new Error('An error occurred while fetching tasks');
    }
  }
}

export default new TaskServices();
