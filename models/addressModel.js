const Joi = require('joi');

module.exports = Joi.object().keys({
    id: Joi.number().integer(),
    address: Joi.string().required(),
    housenumber: Joi.string().required(),
    fkcity: Joi.number().required()
});