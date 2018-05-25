const Joi = require('joi');

module.exports = Joi.object().keys({
    id: Joi.number().integer(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    dueDate: Joi.string().required(),
    billAmount: Joi.number().required(),
    object_id: Joi.number().integer().required(),
    tenancyAgreement_id: Joi.number().integer().required()
});
