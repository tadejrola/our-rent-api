const Joi = require('joi');

module.exports = Joi.object().keys({
    id: Joi.number().integer(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    dueDate: Joi.string().required(),
    billAmount: Joi.number(),
    object_id: Joi.number().integer(),
    payment_id: Joi.number().integer()
});
