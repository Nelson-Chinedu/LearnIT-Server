import { Request, Response } from 'express';
import Joi from 'joi';

const schema = Joi.object({
  course_name: Joi.string().required(),
  price: Joi.string().required(),
  video_url: Joi.array()
    .min(1)
    .required()
    .messages({ 'array.min': 'Video cannot be empty' }),
  course_thumbnail: Joi.string().required(),
  course_preview: Joi.string().required(),
  course_faq: Joi.string().required(),
  course_objective: Joi.string().required(),
});

const courseValidator = (req: Request, res: Response, next: () => void) => {
  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res
      .status(400)
      .send({ message: validationResult.error.details[0].message });
  }
  next();
};

export default courseValidator;
