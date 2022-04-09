import jwt from 'jsonwebtoken';

class Token {
  /**
   * createToken - used to create a new token
   * @param {object | string} payload
   * @param {string} secret
   * @param {string | number} expiresIn
   * @returns {string} token
   */
  createToken(
    payload: object | string,
    secret: string,
    expiresIn: string | number
  ): string {
    return jwt.sign(payload, secret, { expiresIn });
  }

  /**
   * verifyToken - used to verify access token
   * @param {string} payload
   * @param {string} secret
   * @returns {string | JwtPayload}
   */
  verifyToken(payload: string, secret: string) {
    return jwt.verify(payload, secret);
  }
}

export default new Token();
