import { Account } from '../../db';

import { AppDataSource } from '../../index';

class AccountServices {
  async getAllMentors() {
    try {
      const allMentors: Account[] = await AppDataSource.manager
        .getRepository(Account)
        .createQueryBuilder('account')
        .leftJoinAndSelect('account.profile', 'profile')
        .leftJoinAndSelect('profile.bio', 'bio')
        // the below query selects the profile detail relationship excluding the account details
        .select([
          'account.id',
          'profile.id',
          'profile.firstname',
          'profile.lastname',
          'profile.picture',
          'bio.mentorBio',
          'bio.title',
          'bio.timezone',
          'bio.availability',
          'bio.acceptingMentees',
          'bio.yearsOfExperience',
          'bio.fee',
          'bio.company',
        ])
        .where('account.role = :role', { role: 'mentor' })
        .getMany();
      return allMentors;
    } catch (error) {
      throw error;
    }
  }
}

export default new AccountServices();
