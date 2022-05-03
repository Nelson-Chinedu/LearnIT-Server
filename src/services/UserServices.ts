import { Account, Bio, Profile, Course } from '../db';
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
          account: newAccount,
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
          relations: ['profile', 'bio'],
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
      const profile: any = await AppDataSource.manager
        .createQueryBuilder()
        .update(Bio)
        .set({
          mentorBio,
        })
        .where('account.id = :id', { id })
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
    payload: { video_url: string[]; course_name: string; price: string },
    id: Express.User | undefined
  ) {
    const { video_url, course_name, price } = payload;

    try {
      const newCourse: Course = AppDataSource.manager.create(Course, {
        price,
        account: id,
        name: course_name,
        video: video_url,
        count: 0,
      });
      await AppDataSource.manager.save(newCourse);
      return newCourse;
    } catch (error) {
      throw error;
    }
  }

  /**
   * getCourses - used to get list of added course
   * @param {string} id
   * @returns {array} list of added course
   */
  async getCourses(id: Express.User | undefined) {
    try {
      const courses = await AppDataSource.manager
        .getRepository(Course)
        .createQueryBuilder('course')
        .where('course.account = :id', { id })
        .getMany();
      return courses;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserServices();
