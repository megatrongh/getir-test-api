import * as Joi from 'joi';

const schema = Joi.object({
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  minCount: Joi.number().integer().min(1).required(),
  maxCount: Joi.number().integer().min(1).required(),
});

export default schema;
