import { Request, Response } from 'express';
import Joi from 'joi';

const schema = Joi.object({
  mentorBio: Joi.string(),
});

const mentorBioValidator = (req: Request, res: Response, next: () => void) => {
  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res
      .status(400)
      .send({ message: validationResult.error.details[0].message });
  }
  next();
};

export default mentorBioValidator;
