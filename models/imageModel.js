const Joi = require('joi');

module.exports = Joi.object().keys({
    id: Joi.number().integer(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    maintenance_id: Joi.number().integer().required()
});