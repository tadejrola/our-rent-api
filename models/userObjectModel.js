const Joi = require('joi');

module.exports = Joi.object().keys({
    object_id: Joi.number().integer(),
    email: Joi.string()
});