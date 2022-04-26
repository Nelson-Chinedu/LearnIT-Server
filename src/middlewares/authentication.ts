import { Request, Response } from 'express';

import { respondWithWarning } from '../util/httpResponse';

import Token from '../util/Token';

/**
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {next} if cookie is valid || {401} if cookie is invalid
 */
export const authentication = (
  req: Request,
  res: Response,
  next: () => void
) => {
  const token = req.cookies;
  if ('cid' in token) {
    const data: any = Token.verifyToken(
      token.cid,
      process.env.VERIFICATION_JWT_kEY as string
    );
    if (data) {
      req.user = data.id;
      return next();
    } else {
      respondWithWarning(res, 401, 'unauthorized', {});
    }
  } else {
    respondWithWarning(res, 401, 'unauthorized', {});
  }
};
