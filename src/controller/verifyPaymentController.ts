import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import { Account } from '../db';

import { ICardTransaction } from '../interface/ICardTransaction';

import UserServices from '../services/UserServices';

import { fetchApi } from '../util/fetch';
import { respondWithSuccess, respondWithWarning } from '../util/httpResponse';

const verifyPaymentController = async (req: Request, res: Response) => {
  const { referenceID } = req.params;
  const { user: id } = req;

  try {
    const user: Account | null = await UserServices.findUserById(id);

    if (!user) respondWithWarning(res, 401, 'unauthorized', {});

    const response = await fetchApi(referenceID);

    if (response) {
      const {
        data: {
          reference,
          amount,
          paid_at,
          authorization: { last4, exp_month, exp_year, channel, card_type },
        },
      }: ICardTransaction = response;

      const payload = {
        reference,
        amount,
        paid_at,
        last4,
        exp_month,
        exp_year,
        channel,
        card_type,
      };
      respondWithSuccess(res, 200, 'success', payload);
    }
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default verifyPaymentController;
