import { UpdateResult } from 'typeorm';

import { Bio } from '../../db';

import { AppDataSource } from '../../index';

class BioServices {
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
  async updateBio(id: string, data: object) {
    try {
      const profile: UpdateResult = await AppDataSource.manager
        .createQueryBuilder()
        .update(Bio)
        .set({
          ...data,
        })
        .where('profile.id = :id', { id })
        .execute();

      return profile;
    } catch (error) {
      throw new Error('An error occurred while updating user');
    }
  }
}

export default new BioServices();
