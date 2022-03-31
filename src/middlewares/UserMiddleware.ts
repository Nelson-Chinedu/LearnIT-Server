import { Request, Response } from 'express';

import UserServices from '../services/UserServices';

import Hash from '../util/Hash';

import { respondWithWarning } from '../util/httpResponse';

class UserMiddleware {
  /**
   * findEmail - used to check if email exist
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object | null} response
   */
  async findEmail(req: Request, res: Response, next: () => void) {
    try {
      const user = await UserServices.findUserByEmail(req.body.email);
      if (user) {
        return respondWithWarning(
          res,
          409,
          'Email address already exist or invalid',
          {}
        );
      }
      next();
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async findUser(req: Request, res: Response, next: () => void) {
    try {
      const user = await UserServices.findUserByEmail(req.body.email);
      if (!user) {
        return respondWithWarning(
          res,
          404,
          'Invalid email address or password',
          {}
        );
      }
      if (!(await Hash.comparePassword(req.body.password, user.password))) {
        return respondWithWarning(
          res,
          400,
          'Invalid email address or password',
          {}
        );
      }
      const data = {
        id: user.id,
        email: user.email,
        role: user.role,
        blocked: user.blocked,
        verified: user.verified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      req.user = data;
      return next();
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default new UserMiddleware();
