const Joi = require('joi');

module.exports = Joi.object().keys({
    id: Joi.number().integer(),
    notice: Joi.string().required()
});