const Joi = require('joi');

module.exports = Joi.object().keys({
    id: Joi.number().integer(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    username: Joi.string(),
    phoneNumber: Joi.string(),
    job: Joi.string(),
    education: Joi.string(),
    smoker: Joi.boolean(),
    address: Joi.string(),
    image: Joi.string()
});
