import { Request, Response } from 'express';

import UserServices from '../services/UserServices';

import { respondWithWarning } from '../util/httpResponse';

class UserMiddleware {
  /**
   * checkUser - used to check if user exist
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object | null} response
   */
  async checkUser(req: Request, res: Response, next: () => void) {
    try {
      const user = await UserServices.findUserByEmail(req.body.email);
      if (user) {
        return respondWithWarning(
          res,
          400,
          'Email address already exist or invalid',
          {}
        );
      }
      next();
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default new UserMiddleware();
