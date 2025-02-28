import { Request, Response } from 'express';
import Joi from 'joi';

const schema = Joi.object({
  title: Joi.string().required(),
  note: Joi.string(),
  dueDate: Joi.string().required(),
  menteeId: Joi.string(),
});

const taskValidator = (req: Request, res: Response, next: () => void) => {
  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res
      .status(400)
      .send({ message: validationResult.error.details[0].message });
  }
  next();
};

export default taskValidator;
