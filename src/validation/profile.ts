import { Request, Response } from 'express';
import Joi from 'joi';

const schema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  phone: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  address: Joi.string().required(),
  zipCode: Joi.string(),
});

const schemaParam = Joi.object({
  id: Joi.string().required().guid(),
});

const profileValidator = (req: Request, res: Response, next: () => void) => {
  const validationResult = schema.validate(req.body);
  const validationParam = schemaParam.validate(req.params);

  if (validationParam.error) {
    return res
      .status(400)
      .send({ message: validationParam.error.details[0].message });
  } else if (validationResult.error) {
    return res
      .status(400)
      .send({ message: validationResult.error.details[0].message });
  }
  next();
};

export default profileValidator;
