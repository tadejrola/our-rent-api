const Joi = require('joi');

module.exports = Joi.object().keys({
    id: Joi.number().integer(),
    city: Joi.string().required(),
    zip: Joi.number().required(),
    fkcountry: Joi.number().required()
});