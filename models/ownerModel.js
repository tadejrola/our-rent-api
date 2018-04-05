const Joi = require('joi');

module.exports = Joi.object().keys({
    id: Joi.number().integer(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    phonenumber: Joi.string(),
    email: Joi.number()
});