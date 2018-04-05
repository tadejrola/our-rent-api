const Joi = require('joi');

module.exports = Joi.object().keys({
    id: Joi.number().integer(),
    maintenanceDate: Joi.date().required(),
    object_id: Joi.number().integer().required(),
    notice_id: Joi.number().integer().required()
});