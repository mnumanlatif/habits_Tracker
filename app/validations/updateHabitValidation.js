import Joi from 'joi';

export const updateHabitValidationSchema = Joi.object({
  name: Joi.string().min(2).max(50),
  frequency: Joi.string().valid('daily', 'weekly', 'monthly'),
  description: Joi.string().allow('').optional(),
  streak: Joi.number().integer().min(0),
  priority: Joi.string().valid('low', 'medium', 'high'),
  category: Joi.string(),
}).min(1); 
