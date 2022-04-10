import { Request, Response } from 'express';
import Joi from 'joi';

const schema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  password: Joi.string().required(),
});

const signinValidator = (req: Request, res: Response, next: () => void) => {
  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res
      .status(400)
      .send({ message: validationResult.error.details[0].message });
  }
  return next();
};

export default signinValidator;
