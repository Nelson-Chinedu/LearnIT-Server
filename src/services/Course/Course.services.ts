import { Profile, Course, Enroll } from '../../db';

import { AppDataSource } from '../../index';

class CourseServices {
  /**
   * addCourse - used to add new course
   * @param {object} payload
   * @param {string} id
   * @returns {object}
   */
  async addCourse(
    payload: {
      video_url: string[];
      course_name: string;
      price: string;
      course_faq: string;
      course_objective: string;
      course_thumbnail: string;
      course_preview: string;
    },
    id: Express.User | undefined
  ) {
    const {
      video_url,
      course_name,
      price,
      course_faq,
      course_objective,
      course_thumbnail,
      course_preview,
    } = payload;

    const profileID = await AppDataSource.manager
      .getRepository(Profile)
      .createQueryBuilder('profile')
      .where('profile.account = :id', { id })
      .getOne();
    try {
      const newCourse: Course = AppDataSource.manager.create(Course, {
        price,
        faq: JSON.stringify(course_faq),
        objectives: JSON.stringify(course_objective),
        account: id,
        profile: profileID?.id as any,
        name: course_name,
        video: video_url,
        thumbnail: course_thumbnail,
        preview: course_preview,
        count: 0,
      });
      await AppDataSource.manager.save(newCourse);
      return newCourse;
    } catch (error) {
      throw error;
    }
  }

  /**
   * getCourses - used to get mentor list of added course
   * @param {string} id
   * @returns {array} list of mentor added course
   */
  async getCourses(id: Express.User | undefined) {
    try {
      const courses: Course[] = await AppDataSource.manager
        .getRepository(Course)
        .createQueryBuilder('course')
        .where('course.profile = :id', { id })
        .getMany();
      return courses;
    } catch (error) {
      throw error;
    }
  }

  /**
   * getAllCourses - used to get all list of added course
   * @returns {array} list of all added course
   */
  async getAllCourses() {
    try {
      const courses: Course[] = await AppDataSource.manager
        .getRepository(Course)
        .createQueryBuilder('course')
        .leftJoinAndSelect('course.profile', 'profile')
        .getMany();
      return courses;
    } catch (error) {
      throw error;
    }
  }

  async enrollCourse(payload: {
    id: Express.User | undefined;
    courseId: Express.User | undefined;
  }) {
    const { id, courseId } = payload;
    try {
      const enroll = AppDataSource.manager.create(Enroll, {
        profile: id,
        course: courseId,
      });
      await AppDataSource.manager.save(enroll);
      return enroll;
    } catch (error) {
      throw error;
    }
  }

  async getEnrolledCourse(id: Express.User | undefined) {
    try {
      const enrolledCourses = await AppDataSource.manager
        .getRepository(Enroll)
        .createQueryBuilder('enroll')
        .leftJoinAndSelect('enroll.course', 'course')
        .leftJoinAndSelect('course.profile', 'profile')
        .where('enroll.profile = :profileId', {
          profileId: id,
        })
        .getMany();
      return enrolledCourses;
    } catch (error) {
      throw error;
    }
  }

  async unenrollCourse(payload: {
    id: Express.User | undefined;
    courseId: string | number;
  }) {
    const { id, courseId } = payload;

    try {
      const course = AppDataSource.manager
        .getRepository(Enroll)
        .createQueryBuilder('enroll')
        .delete()
        .where('course = :courseId', { courseId })
        .andWhere('profile = :profileId', { profileId: id })
        .execute();

      return course;
    } catch (error) {
      throw error;
    }
  }

  /**
   * getEnrollCourseDetail - used to get the detail of a course enrolled
   * @returns {object} course detail
   */
  async getEnrollCourseDetail(payload: {
    id: Express.User | undefined;
    courseId: string | number;
  }) {
    const { id, courseId } = payload;

    try {
      const course = AppDataSource.manager
        .getRepository(Enroll)
        .createQueryBuilder('enroll')
        .leftJoinAndSelect('enroll.course', 'course')
        .leftJoinAndSelect('course.profile', 'profile')
        .where('enroll.course = :courseId', { courseId })
        .andWhere('enroll.profile = :id', { id })
        .getOne();

      return course;
    } catch (error) {
      throw error;
    }
  }
}

export default new CourseServices();
