import { Request, Response } from 'express';
import Joi from 'joi';

const schema = Joi.object({
  mentorBio: Joi.string(),
  company: Joi.string(),
  yearsOfExperience: Joi.string(),
  fee: Joi.string(),
  timezone: Joi.string(),
  availability: Joi.boolean(),
  acceptingMentees: Joi.boolean(),
});

const schemaParam = Joi.object({
  id: Joi.string().required().guid(),
});

const mentorBioValidator = (req: Request, res: Response, next: () => void) => {
  const validationResult = schema.validate(req.body);
  const validationParam = schemaParam.validate(req.params);

  if (validationParam.error) {
    return res
      .status(400)
      .send({ message: validationParam.error.details[0].message });
  } else if (validationResult.error) {
    return res
      .status(400)
      .send({ message: validationResult.error.details[0].message.replace(/"/g, '') });
  }
  next();
};

export default mentorBioValidator;
