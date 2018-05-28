const Joi = require('joi');

module.exports = Joi.object().keys({
    id: Joi.number().integer(),
    name: Joi.string(),
    description: Joi.string(),
    dueDate: Joi.string(),
    billAmount: Joi.number(),
    image: Joi.string(),
    paid: Joi.boolean(),
    object_id: Joi.number().integer(),
    tenancyAgreement_id: Joi.number().integer()
});
