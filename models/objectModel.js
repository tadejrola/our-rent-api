const Joi = require('joi');

module.exports = Joi.object().keys({
    id: Joi.number().integer(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    image: Joi.string().required(),
    address: Joi.string().required(),
    user_id: Joi.number().integer().required()
});