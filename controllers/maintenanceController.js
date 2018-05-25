const express = require('express');
const router = express.Router();
let mainenanceModel = require('../models/maintenanceModel');
const dbHelper = require('../helpers/dbHelper');
const Joi = require('joi');

router.get('/', async (req, res, next) => {
    try {
        const data = await new dbHelper.maintenance().fetchAll();
        res.json(data.toJSON());
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id < 1)
        res.status(500).send('Neprimeren ID');
    else {
        try {
            const data = await new dbHelper.maintenance({ id }).fetch();
            res.json(data.toJSON());
        } catch (error) {
            res.status(500).json(error);
        }
    }
});

router.get('/objectMaintenance/:objectID', async (req, res, next) => {
    const objectId = parseInt(req.params.objectID);
    if (isNaN(objectId) || objectId < 1)
        res.status(500).send('Neprimeren ID');
    else {
        try {
            const data = await new dbHelper.object().query('where', 'object_id', '=', objectId.toString()).fetchAll();
            res.json(data.toJSON());
        } catch (error) {
            res.status(500).json(error);
        }
    }
});

router.post('/', (req, res, next) => {
    Joi.validate(req.body, mainenanceModel, async function (err, value) {
        if (err !== null)
            res.status(500).send(err);
        try {
            await new dbHelper.maintenance(value).save();
            res.end();
        } catch (error) {
            res.status(500).json(error);
        }
    });
});

router.put('/:id', (req, res, next) => {
    Joi.validate(req.body, mainenanceModel, async function (err, value) {
        const id = parseInt(req.params.id);
        if (err !== null)
            res.status(500).send(err);
        else if (isNaN(id) || id < 1)
            res.status(500).send('Neprimeren ID');
        try {
            value.id = id;
            if (await new dbHelper.maintenance({ id }).fetch() !== null)
                await new dbHelper.maintenance(value).save(null, { method: 'update' });
            else
                await new dbHelper.maintenance(value).save(null, { method: 'insert' });
            res.end();
        } catch (error) {
            res.status(500).json(error);
        }
    });
});

router.delete('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id < 1)
        res.status(500).send('Neprimeren ID');
    try {
        const data = await new dbHelper.maintenance({ id }).destroy();
        res.json(data.toJSON());
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;