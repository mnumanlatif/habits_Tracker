import Joi from 'joi';

export const habitValidationSchema = Joi.object({
  userId: Joi.string().required(),
  name: Joi.string().min(5).max(50).required(),
  frequency: Joi.string().valid('daily', 'weekly', 'monthly').required(),
  description: Joi.string().allow('').optional(),
  streak: Joi.number().integer().min(0).optional(),
  priority: Joi.string().valid('low', 'medium', 'high').default('medium'),
  category: Joi.string().default('General'),
});
