import { Request, Response } from 'express';
import Joi from 'joi';

const schemaParam = Joi.object({
  mentorId: Joi.string().required().guid(),
  menteeId: Joi.string().required().guid(),
});

export const menteeDetailValidator = (
  req: Request,
  res: Response,
  next: () => void
) => {
  const validationParam = schemaParam.validate(req.params);

  if (validationParam.error) {
    return res
      .status(400)
      .send({ message: validationParam.error.details[0].message });
  }
  next();
};
