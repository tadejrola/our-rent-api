const Joi = require('joi');

module.exports = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
});