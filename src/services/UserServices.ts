import { UpdateResult } from 'typeorm';
import {
  Account,
  Bio,
  Profile,
  Course,
  Category,
  Resource,
  Enroll,
} from '../db';
import { UserRole } from '../db/entity/Account';

import { AppDataSource } from '../index';

interface ICreateUser {
  email: string;
  role: UserRole;
  password: string;
  firstname: string;
  lastname: string;
}

class UserServices {
  /**
   * findUserByEmail - used to get find email from db
   * @param {string} email - email of the user
   * @returns {object} user data from db
   */
  async findUserByEmail(email: string): Promise<Account | null> {
    try {
      const user: Account | null = await AppDataSource.manager.findOneBy(
        Account,
        { email }
      );
      if (!user) return null;
      return user;
    } catch (error) {
      throw new Error('An error occurred while fetching user');
    }
  }

  /**
   * createUser - used to create new user to db
   * @param {object} payload
   * @returns {string} user id
   */
  async createUser(payload: ICreateUser): Promise<string> {
    try {
      const { email, role, password, firstname, lastname } = payload;

      const newAccount: Account = AppDataSource.manager.create(Account, {
        email,
        role,
        password,
      });
      await AppDataSource.manager.save(newAccount);

      const newProfile: Profile = AppDataSource.manager.create(Profile, {
        phone: '',
        city: '',
        state: '',
        zipCode: '',
        address: '',
        country: '',
        firstname,
        lastname,
        account: newAccount,
      });
      await AppDataSource.manager.save(newProfile);

      if (role === 'mentor') {
        const newBio: Bio = AppDataSource.manager.create(Bio, {
          mentorBio: '',
          profile: newProfile,
        });
        await AppDataSource.manager.save(newBio);
      }

      return newAccount.id;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   * findUserById - used to find user by ID in Account table
   * @param {string} id
   * @returns {object} Account with relation or null
   */
  async findUserById(id: any) {
    try {
      const user: Account | null = await AppDataSource.manager
        .getRepository(Account)
        .findOne({
          where: { id },
          relations: ['profile'],
        });

      return user;
    } catch (error) {
      throw new Error('An error occurred while fetching user');
    }
  }

  /**
   * updateProfile - used to update user profile using id
   * @param {string} id
   * @param {object} data
   * @returns {object}
   */
  async updateProfile(
    id: string,
    data: {
      firstname: string;
      lastname: string;
      phone: string;
      city: string;
      state: string;
      country: string;
      address: string;
      zipCode: string;
    }
  ) {
    const {
      firstname,
      lastname,
      phone,
      city,
      state,
      country,
      address,
      zipCode,
    } = data;
    try {
      const profile: any = await AppDataSource.manager
        .createQueryBuilder()
        .update(Profile)
        .set({
          firstname,
          lastname,
          phone,
          city,
          state,
          country,
          address,
          zipCode,
        })
        .where('id = :id', { id })
        .execute();

      return profile;
    } catch (error) {
      throw new Error('An error occurred while updating user');
    }
  }

  /**
   * getBio - Get user (mentor) bio
   * @param {string} id
   * @returns {object}
   */
  async getBio(id: Express.User | undefined) {
    try {
      const bio = await AppDataSource.manager
        .getRepository(Bio)
        .createQueryBuilder('bio')
        .where('bio.profile = :id', { id })
        .getOne();

      return bio;
    } catch (error) {
      throw new Error('An error occurred while fetching bio');
    }
  }

  /**
   * updateBio - used to update user <Mentor> bio using id
   * @param {string} id
   * @param {object} data
   * @returns {object}
   */
  async updateBio(
    id: string,
    data: {
      mentorBio: string;
    }
  ) {
    const { mentorBio } = data;
    try {
      const profile: UpdateResult = await AppDataSource.manager
        .createQueryBuilder()
        .update(Bio)
        .set({
          mentorBio,
        })
        .where('profile.id = :id', { id })
        .execute();

      return profile;
    } catch (error) {
      throw new Error('An error occurred while updating user');
    }
  }

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

  async addCategory(payload: any) {
    const { name, id } = payload;
    try {
      const newCategory: Category = AppDataSource.manager.create(Category, {
        name,
        profile: id,
      });
      await AppDataSource.manager.save(newCategory);
      return newCategory;
    } catch (error) {
      throw error;
    }
  }

  async getCategories(id: Express.User | undefined) {
    try {
      const categories: Category[] = await AppDataSource.manager
        .getRepository(Category)
        .createQueryBuilder('category')
        .leftJoinAndSelect('category.resource', 'resource')
        .where('category.profile = :id', { id })
        .getMany();

      return categories;
    } catch (error) {
      throw error;
    }
  }

  async addResource(payload: any) {
    const { name, url, id, categoryId } = payload;

    try {
      const newResource: Resource = AppDataSource.manager.create(Resource, {
        name,
        url,
        profile: id,
        category: categoryId,
      });
      await AppDataSource.manager.save(newResource);
      return newResource;
    } catch (error) {
      throw error;
    }
  }

  async getResources(payload: any) {
    const { id, categoryId } = payload;
    try {
      const resources: Resource[] = await AppDataSource.manager
        .getRepository(Resource)
        .createQueryBuilder('resource')
        .where('resource.profile = :id', { id })
        .andWhere('resource.category = :categoryId', {
          categoryId,
        })
        .getMany();
      return resources;
    } catch (error) {
      throw error;
    }
  }

  async getAllResources(id: Express.User | string) {
    try {
      const resources: Resource[] = await AppDataSource.manager
        .getRepository(Resource)
        .createQueryBuilder('resource')
        .where('resource.profile = :id', { id })
        .getMany();
      return resources;
    } catch (error) {
      throw error;
    }
  }

  async updateProfilePicture(id: Express.User | undefined, url: string) {
    try {
      const profile: UpdateResult = await AppDataSource.manager
        .createQueryBuilder()
        .update(Profile)
        .set({
          picture: url,
        })
        .where('id = :id', { id })
        .execute();
      return profile;
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

export default new UserServices();
