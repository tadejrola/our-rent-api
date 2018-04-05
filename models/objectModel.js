const Joi = require('joi');

module.exports = Joi.object().keys({
    id: Joi.number().integer(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    image: Joi.string().required(),
    address_id: Joi.number().integer().required(),
    owner_id: Joi.number().integer().required()
});