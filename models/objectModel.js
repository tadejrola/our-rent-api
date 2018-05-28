const Joi = require('joi');

module.exports = Joi.object().keys({
    id: Joi.number().integer(),
    description: Joi.string(),
    category: Joi.string(),
    image: Joi.string(),
    address: Joi.string(),
    user_id: Joi.number().integer()
});