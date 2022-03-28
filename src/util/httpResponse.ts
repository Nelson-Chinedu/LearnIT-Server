import { Response } from 'express';

export const respondWithSuccess = (
  res: Response,
  status: number,
  message: string,
  payload = {}
): Response => {
  return res.status(status).send({
    status,
    message,
    payload: Array.isArray(payload) ? [...payload] : { ...payload },
  });
};

export const respondWithWarning = (
  res: Response,
  status: number,
  message: string,
  payload: {}
) => {
  return res.status(status).send({
    status,
    message,
    payload,
  });
};
