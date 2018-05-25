const express = require('express');
const router = express.Router();
let objectModel = require('../models/objectModel');
const dbHelper = require('../helpers/dbHelper');
const Joi = require('joi');

router.get('/', async (req, res, next) => {
    try {
        const data = await new dbHelper.object().fetchAll();
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
            const data = await new dbHelper.object({ id }).fetch();
            res.json(data.toJSON());
        } catch (error) {
            res.status(500).json(error);
        }
    }
});

router.get('/userObjects/:userID', async (req, res, next) => {
    const userId = parseInt(req.params.userID);
    if (isNaN(userId) || userId < 1)
        res.status(500).send('Neprimeren ID');
    else {
        try {
            const data = await new dbHelper.object().query('where', 'user_id', '=', userId.toString()).fetchAll();
            res.json(data.toJSON());
        } catch (error) {
            res.status(500).json(error);
        }
    }
});

router.get('/tenants/:objectID', async (req, res, next) => {
    const objectId = parseInt(req.params.objectID);
    if (isNaN(objectId) || objectId < 1)
        res.status(500).send('Neprimeren ID');
    else {
        try {
            var data = [];
            var tenancyAgreement = await new dbHelper.tenancyAgreement().query('where', 'object_id', '=', objectId).fetchAll();
            var users = await new dbHelper.user({}).fetchAll();
            tenancyAgreement = tenancyAgreement.toJSON();
            users = users.toJSON();
            var userAdded = false;
            var userTemp = null;
            users.forEach(userEl => {
                userEl.password = "HIDDEN FIELD";
                tenancyAgreement.forEach(tenancyEl => {
                    if (userEl.id === tenancyEl.user_id) {
                        if (userTemp === null) {
                            userTemp = userEl;
                            userAdded = true;
                            userTemp.tenancyAgreements = [];
                        }
                        userTemp.tenancyAgreements.push(tenancyEl);
                    }
                });
                if (userAdded) {
                    data.push(userTemp);
                }
                userAdded = false;
                userTemp = null;
            });
            res.json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    }
});

router.post('/', (req, res, next) => {
    Joi.validate(req.body, objectModel, async function (err, value) {
        if (err !== null)
            res.status(500).send(err);
        try {
            await new dbHelper.object(value).save();
            res.end();
        } catch (error) {
            res.status(500).json(error);
        }
    });
});

router.put('/:id', (req, res, next) => {
    Joi.validate(req.body, objectModel, async function (err, value) {
        const id = parseInt(req.params.id);
        if (err !== null)
            res.status(500).send(err);
        else if (isNaN(id) || id < 1)
            res.status(500).send('Neprimeren ID');
        try {
            value.id = id;
            if (await new dbHelper.object({ id }).fetch() !== null)
                await new dbHelper.object(value).save(null, { method: 'update' });
            else
                await new dbHelper.object(value).save(null, { method: 'insert' });
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
        const data = await new dbHelper.object({ id }).destroy();
        res.json(data.toJSON());
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;