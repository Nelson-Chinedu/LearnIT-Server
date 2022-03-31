import bcrypt from 'bcrypt';

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
      throw new Error(error);
    }
  }

  /**
   * comparePassword - used to compare user password entered with passwsord saved in db
   * @param {string} password
   * @param {string} hashedPassword
   * @returns {boolean} true if password match
   */
  async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      return bcrypt.compare(password, hashedPassword);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default new Hash();
