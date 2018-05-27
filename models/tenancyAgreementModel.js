const Joi = require('joi');

module.exports = Joi.object().keys({
    id: Joi.number().integer(),
    validFrom: Joi.string(),
    validTo: Joi.string(),
    scan: Joi.string(),
    paymentInterval: Joi.string(),
    paymentAmount: Joi.number(),
    currency: Joi.string(),
    dateSigned: Joi.string(),
    object_id: Joi.number().integer().required(),
    user_id: Joi.number().integer().required()
});