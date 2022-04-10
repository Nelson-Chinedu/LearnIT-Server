import { Request, Response } from 'express';
import Joi from 'joi';

const schema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  address: Joi.string().required(),
  zipCode: Joi.string(),
});

const profileValidator = (req: Request, res: Response, next: () => void) => {
  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res
      .status(400)
      .send({ message: validationResult.error.details[0].message });
  }
  next();
};

export default profileValidator;
