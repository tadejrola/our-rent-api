const Joi = require('joi');

module.exports = Joi.object().keys({
  id: Joi.number().integer(),
  description: Joi.string().required(),
  paid: Joi.boolean(),
  paymentDate: Joi.string(),
  amount: Joi.number(),
  tenancyAgreement_id: Joi.number().integer()
});
