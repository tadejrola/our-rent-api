const Joi = require('joi');

module.exports = Joi.object().keys({
    id: Joi.number().integer(),
    name: Joi.string(),
    validFrom: Joi.string(),
    validTo: Joi.string(),
    image: Joi.string(),
    paymentInterval: Joi.string(),
    paymentAmount: Joi.number(),
    currency: Joi.string(),
    dateSigned: Joi.string(),
    object_id: Joi.number().integer(),
    user_id: Joi.number().integer()
});