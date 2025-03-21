import { UpdateResult } from 'typeorm';
import { Account, Bio, Profile } from '../../db';
import { UserRole } from '../../db/entity/Account.entity';

import { AppDataSource } from '../../index';

interface ICreateUser {
  email: string;
  role: UserRole;
  password: string;
  firstname: string;
  lastname: string;
  company?: string;
  yearsOfExperience?: string;
  title?: string;
}

class AuthServices {
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
      const {
        email,
        role,
        password,
        firstname,
        lastname,
        company,
        yearsOfExperience,
        title,
      } = payload;

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
          yearsOfExperience,
          company,
          title,
          mentorBio: '',
          availability: false,
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

  /**
   * verifyEmail - used to verify new user
   * @param {uuid} id
   * @returns {object}
   */
  async verifyEmail(id: string) {
    try {
      const account: UpdateResult = await AppDataSource.manager
        .createQueryBuilder()
        .update(Account)
        .set({
          verified: true,
        })
        .where('id = :id', { id })
        .execute();

      return account;
    } catch (error) {
      throw new Error('An error occurred while updating user');
    }
  }
}

export default new AuthServices();
