const Joi = require('joi');

module.exports = Joi.object().keys({
    email: Joi.string(),
    password: Joi.string()
});