import { Account, Subscription } from '../../db';

import { AppDataSource } from '../../index';

class SubscriptionServices {
  /**
   * updateSubscription - used to update user isSubscribe using id
   * @param {uuid} id
   * @returns {object}
   */
  async updateSubsription(id: Express.User | undefined, body: any) {
    try {
      const account: any = await AppDataSource.manager
        .createQueryBuilder()
        .update(Account)
        .set({
          isSubscribed: true,
          subscription: body,
        })
        .where('id = :id', { id })
        .execute();

      return account;
    } catch (error) {
      throw new Error('An error occurred while updating user');
    }
  }

  async getSubscriptions(id: Express.User) {
    try {
      const subscriptions = await AppDataSource.manager
        .getRepository(Subscription)
        .createQueryBuilder('subscription')
        .leftJoin('subscription.account', 'account')
        .leftJoin('account.profile', 'profile')
        // the below query selects the profile detail relationship and renaming to a new field using the AS keyword
        .select([
          'profile.id AS id',
          'profile.firstname AS firstname',
          'profile.lastname AS lastname',
          'profile.picture AS picture',
          'profile.phone AS phone',
          'account.isSubscribed AS is_active',
        ])
        .where('subscription.mentor = :mentorId', {
          mentorId: id,
        })
        .getRawMany();
      return subscriptions;
    } catch (error) {
      throw new Error('An error occurred');
    }
  }

  async getStudentCounts(id: Express.User) {
    try {
      const getTotalStudents = await AppDataSource.manager
        .getRepository(Subscription)
        .createQueryBuilder('subscription')
        .where('subscription.mentor = :mentorId', {
          mentorId: id,
        })
        .getCount();

      const getActiveStudents = await AppDataSource.manager
        .getRepository(Subscription)
        .createQueryBuilder('subscription')
        .leftJoinAndSelect('subscription.account', 'account')
        .where('subscription.mentor = :mentorId', {
          mentorId: id,
        })
        .andWhere('account.isSubscribed = :isSubscribed', {
          isSubscribed: true,
        })
        .getCount();

      const getInactiveStudents = await AppDataSource.manager
        .getRepository(Subscription)
        .createQueryBuilder('subscription')
        .leftJoinAndSelect('subscription.account', 'account')
        .where('subscription.mentor = :mentorId', {
          mentorId: id,
        })
        .andWhere('account.isSubscribed = :isSubscribed', {
          isSubscribed: false,
        })
        .getCount();

      return {
        totalStudents: getTotalStudents,
        activeStudents: getActiveStudents,
        inactiveStudents: getInactiveStudents,
      };
    } catch (error) {
      throw new Error('An error occurred');
    }
  }

  async addSubscription(id: any, payload: any) {
    const { card, mentorId, menteeAccountId } = payload;
    const expireDate = new Date();

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const newSub = AppDataSource.manager.create(Subscription, {
        card,
        expireDate,
        mentee: id,
        account: menteeAccountId,
        mentor: mentorId,
      });

      await queryRunner.manager.save(newSub);
      await queryRunner.manager
        .createQueryBuilder()
        .update(Account)
        .set({ isSubscribed: true })
        .where('id = :id', { id: menteeAccountId })
        .execute();
      await queryRunner.commitTransaction();
      return newSub;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getSubscribedMentors(id: Express.User | undefined) {
    try {
      const subscribedMentors: Subscription[] = await AppDataSource.manager
        .getRepository(Subscription)
        .createQueryBuilder('subscription')
        .leftJoinAndSelect('subscription.mentor', 'mentor')
        .leftJoinAndSelect('mentor.bio', 'bio')
        // the below query selects the profile detail relationship excluding the account details
        .select([
          'subscription.id',
          'mentor.id',
          'mentor.firstname',
          'mentor.lastname',
          'mentor.picture',
          'bio.title',
          'bio.company',
        ])
        .where('subscription.menteeId = :id', { id })
        .getMany();
      return subscribedMentors;
    } catch (error) {
      throw error;
    }
  }

  async getSubscribedMentees(id: Express.User | undefined) {
    try {
      const subscribedMentors = await AppDataSource.manager
        .getRepository(Subscription)
        .createQueryBuilder('subscription')
        .leftJoinAndSelect('subscription.mentee', 'mentee')
        // the below query selects the profile detail relationship excluding the account details
        .select([
          'subscription.id',
          'mentee.id',
          'mentee.firstname',
          'mentee.lastname',
          'mentee.picture',
        ])
        .where('subscription.mentorId = :id', { id })
        .getMany();
      return subscribedMentors;
    } catch (error) {
      throw error;
    }
  }
}

export default new SubscriptionServices();
