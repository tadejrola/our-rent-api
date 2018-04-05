const Joi = require('joi');

module.exports = Joi.object().keys({
    id: Joi.number().integer(),
    country: Joi.string().required()
});