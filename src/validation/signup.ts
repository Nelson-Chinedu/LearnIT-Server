import { Request, Response } from 'express';
import Joi from 'joi';

const schema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().required(),
  company: Joi.string(),
  yearsOfExperience: Joi.string(),
  title: Joi.string(),
});

const signupValidator = (req: Request, res: Response, next: () => void) => {
  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res
      .status(400)
      .send({ message: validationResult.error.details[0].message });
  }
  next();
};

export default signupValidator;
