const Joi = require('joi');

module.exports = Joi.object().keys({
    id: Joi.number().integer(),
    description: Joi.string(),
    image: Joi.string(),
    maintenance_id: Joi.number().integer()
});