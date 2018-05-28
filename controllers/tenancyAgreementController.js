const express = require('express');
const router = express.Router();
let tenancyAgreementModel = require('../models/tenancyAgreementModel');
let userObjectModel = require('../models/userObjectModel');
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
            let qb = dbHelper.tenancyAgreement();

            const data = await qb.where('user_id', '=', userId.toString()).andWhere("object_id", "=", objectId.toString()).fetchAll();
            res.json(data.toJSON());
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

router.post('/addObjectUser/', (req, res, next) => {
    Joi.validate(req.body, userObjectModel, async function (err, value) {
        if (err !== null)
            res.status(500).send(err);
        try {
            var user = await new dbHelper.user({ email: value.email }).fetch();
            var object = await new dbHelper.object({ id: value.object_id }).fetch();
            if (user !== null && object !== null) {
                await new dbHelper.tenancyAgreement({
                    name: "Empty agreement",
                    object_id: value.object_id,
                    user_id: user.id
                }).save();
                res.end();
            } else {
                if (user === null)
                    res.status(400).json("User with selected email doesn't exist");
                else if (object === null)
                    res.status(400).json("Object with selected ID doesn't exist");
            }
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