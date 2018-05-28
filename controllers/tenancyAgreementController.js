const express = require('express');
const router = express.Router();
let tenancyAgreementModel = require('../models/tenancyAgreementModel');
const dbHelper = require('../helpers/dbHelper');
const Joi = require('joi');

router.get('/', async (req, res, next) => {
    try {
        const data = await new dbHelper.tenancyAgreement().fetchAll();
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
            const data = await new dbHelper.tenancyAgreement({ id }).fetch();
            res.json(data.toJSON());
        } catch (error) {
            res.status(500).json(error);
        }
    }
});
router.get('/userTenancies/:userID', async (req, res, next) => {
    const userId = parseInt(req.params.userID);
    if (isNaN(userId) || userId < 1)
        res.status(500).send('Neprimeren ID');
    else {
        try {
            const data = await new dbHelper.tenancyAgreement().query('where', 'user_id', '=', userId.toString()).fetchAll();
            res.json(data.toJSON());
        } catch (error) {
            res.status(500).json(error);
        }
    }
});
router.get('/userTenancies/:userID/:objectID', async (req, res, next) => {
    const userId = parseInt(req.params.userID);
    const objectId = parseInt(req.params.objectID)
    if (isNaN(userId) || userId < 1)
        res.status(500).send('Neprimeren ID');
    else {
        try {
            const data = await new dbHelper.tenancyAgreement().query('where', 'user_id', '=', userId.toString()).fetchAll();
            const finalData = data.filter(function (obj) {
                return obj.object_id = objectId;
            })
            res.json(finalData.toJSON());
        } catch (error) {
            res.status(500).json(error);
        }
    }
});

router.post('/', (req, res, next) => {
    Joi.validate(req.body, tenancyAgreementModel, async function (err, value) {
        if (err !== null)
            res.status(500).send(err);
        try {
            await new dbHelper.tenancyAgreement(value).save();
            res.end();
        } catch (error) {
            res.status(500).json(error);
        }
    });
});

router.put('/:id', (req, res, next) => {
    Joi.validate(req.body, tenancyAgreementModel, async function (err, value) {
        const id = parseInt(req.params.id);
        if (err !== null)
            res.status(500).send(err);
        else if (isNaN(id) || id < 1)
            res.status(500).send('Neprimeren ID');
        try {
            value.id = id;
            if (await new dbHelper.tenancyAgreement({ id }).fetch() !== null)
                await new dbHelper.tenancyAgreement(value).save(null, { method: 'update' });
            else
                await new dbHelper.tenancyAgreement(value).save(null, { method: 'insert' });
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
        const data = await new dbHelper.tenancyAgreement({ id }).destroy();
        res.json(data.toJSON());
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;