const Joi = require('joi');

module.exports = Joi.object().keys({
    id: Joi.number().integer(),
    description: Joi.string().required(),
    fixed: Joi.boolean().required(),
    fixingCost: Joi.number().integer().required(),
    fixedDate: Joi.date().required(),
    dateReported: Joi.date().required(),
    object_id: Joi.number().integer().required(),
    tenant_id: Joi.number().integer().required()
});