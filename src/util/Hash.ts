import bcrypt from 'bcrypt';
import winstonEnvLogger from 'winston-env-logger';

class Hash {
  /**
   * hashPassword - used to hash/encrypt user password
   * @param {string} password
   * @returns {string} hashedPassword
   */

  async hashPassword(password: string) {
    const salt = 10;
    try {
      return await bcrypt.hash(password, salt);
    } catch (error: any) {
      winstonEnvLogger.error({
        message: 'An error occured',
        error,
      });
      throw new Error(error);
    }
  }
}

export default new Hash();
