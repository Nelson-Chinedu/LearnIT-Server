import { AppDataSource } from '../../index';

import { TaskStatus } from '../../db/entity/Task.entity';
import { Task } from '../../db';

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
    try {
      console.log({ payload }, id);
      const newTask = AppDataSource.manager.create(Task, {
        title,
        note,
        dueDate,
        status,
        mentor: id,
        mentee: menteeId,
      });
      await AppDataSource.manager.save(newTask);
      return newTask;
    } catch (error) {
      throw new Error('An error occurred while creating task');
    }
  }

  async getMentorTasks(
    mentorId: Express.User | undefined,
    menteeId: Express.User | undefined
  ) {
    try {

      console.log(menteeId, 'POP', mentorId)
      const tasks = await AppDataSource.manager
        .getRepository(Task)
        .createQueryBuilder('task')
        .where('task.mentor = :mentorId', {mentorId})
        .andWhere('task.mentee = :menteeId', {menteeId })
        .getMany()

        return tasks;
    } catch (error) {
      throw new Error('An error occurred while fetching tasks');
    }
  }
}

export default new TaskServices();
