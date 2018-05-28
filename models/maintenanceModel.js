const Joi = require('joi');

module.exports = Joi.object().keys({
    id: Joi.number().integer(),
    description: Joi.string(),
    fixed: Joi.boolean(),
    fixingCost: Joi.number().integer(),
    fixedDate: Joi.date(),
    dateReported: Joi.date(),
    object_id: Joi.number().integer(),
    tenant_id: Joi.number().integer()
});