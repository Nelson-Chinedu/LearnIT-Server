import { Request, Response } from 'express';

import { Account } from '../db';

import UserServices from '../services/UserServices';

import Hash from '../util/Hash';
import token from '../util/Token';
import { respondWithWarning } from '../util/httpResponse';

import { signupTemplate } from '../template/mail';

import { eventEmitter } from '../index';

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
      const user: Account | null = await UserServices.findUserByEmail(
        req.body.email
      );
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

  /**
   * findUser - used to check if user credentials matches saved record
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} req
   */
  async findUser(req: Request, res: Response, next: () => void) {
    try {
      const user: Account | null = await UserServices.findUserByEmail(
        req.body.email
      );

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
      if (user && !user.verified) {
        const accessToken = token.createToken(
          { id: user.id },
          process.env.VERIFICATION_JWT_kEY as string,
          '2d'
        );
        const payload = {
          role: user.role,
          verificationLink: `${process.env.CLIENT_URL}/auth/verify?t=${accessToken}`,
        };
        if (process.env.NODE_ENV !== 'production') {
          eventEmitter.emit('verification_mail', {
            email: req.body.email,
            subject: 'Welcome to LearnIT! Confirm Your Email',
            body: signupTemplate({
              name: `Howdy`,
              url: payload.verificationLink,
            }),
          });
        }
        return respondWithWarning(
          res,
          400,
          'Account not verified, Kindly check your email to verify account',
          {}
        );
      }
      if (user && user.blocked) {
        return respondWithWarning(
          res,
          401,
          'Account blocked, kindly contact support',
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

  /**
   * findRole - used to check authorization on user role
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns next if authorized or forbidden if not
   */
  async findRole(req: Request, res: Response, next: () => void) {
    try {
      const { user: id } = req;
      const account: Account | null = await UserServices.findUserById(id);
      if (account) {
        const { role } = account;
        if (role === 'mentor') {
          return next();
        } else {
          respondWithWarning(res, 403, 'forbidden', {});
        }
      } else {
        respondWithWarning(res, 403, 'forbidden', {});
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default new UserMiddleware();
