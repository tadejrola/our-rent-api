const Joi = require('joi');

module.exports = Joi.object().keys({
    id: Joi.number().integer(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    job: Joi.string().required(),
    education: Joi.string().required(),
    smoker: Joi.boolean().required(),
    email: Joi.string().required(),
    address: Joi.string().required(),
    image: Joi.string().required()
});
