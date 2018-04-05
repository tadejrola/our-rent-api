const Joi = require('joi');

module.exports = Joi.object().keys({
    id: Joi.number().integer(),
    validFrom: Joi.string().required(),
    validTo: Joi.string().required(),
    scan : Joi.string().required(),
    paymentInterval: Joi.string().required(),
    paymentAmount:Joi.number().integer(),
    currency: Joi.string().required(),
    dateSigned: Joi.string().required(),
    object_id: Joi.number().integer().required(),
    tenant_id: Joi.number().integer().required()
});