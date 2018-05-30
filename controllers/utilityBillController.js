const express = require('express');
const router = express.Router();
let utilityBillModel = require('../models/utilityBillModel');
const dbHelper = require('../helpers/dbHelper');
const Joi = require('joi');

router.get('/', async (req, res, next) => {
    try {
        const data = await new dbHelper.utilityBill().fetchAll();
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
            const data = await new dbHelper.utilityBill({ id }).fetch();
            res.json(data.toJSON());
        } catch (error) {
            res.status(500).json(error);
        }
    }
});

router.get('/objectUtilityBill/:objectID', async (req, res, next) => {
    const objectId = parseInt(req.params.objectID);
    if (isNaN(objectId) || objectId < 1)
        res.status(500).send('Neprimeren ID');
    else {
        try {
            const data = await new dbHelper.utilityBill().query('where', 'object_id', '=', objectId.toString()).fetchAll();
            res.json(data.toJSON());
        } catch (error) {
            res.status(500).json(error);
        }
    }
});

/*router.get('/userObjectUtilityBill/:userID', async (req, res, next) => {
    const userId = parseInt(req.params.userID); 

    if (isNaN(userId) || userId < 1)
        res.status(500).send('Neprimeren ID');
    else {
        try {
            const dataTenancy = await new dbHelper.tenancyAgreement().query('where', 'user_id', '=', userId.toString()).fetchAll();
            var dataJSON = dataTenancy.toJSON();
            var utilityBillArray = [];

            dataJSON.forEach(element => {
                const data = await new dbHelper.utilityBill().query('where', 'tenancyAgreement_id', '=', element.id.toString()).fetchAll();
                var jsonData = data.toJSON();
                utilityBillArray.push(jsonData);
            });

            res.json(utilityBillArray);
            
        } catch (error) {
            res.status(500).json(error);
        }
    }
});*/

router.post('/', (req, res, next) => {
    Joi.validate(req.body, utilityBillModel, async function (err, value) {
        if (err !== null)
            res.status(500).send(err);
        try {
            await new dbHelper.utilityBill(value).save();
            res.end();
        } catch (error) {
            res.status(500).json(error);
        }
    });
});

router.put('/:id', (req, res, next) => {
    Joi.validate(req.body, utilityBillModel, async function (err, value) {
        const id = parseInt(req.params.id);
        if (err !== null)
            res.status(500).send(err);
        else if (isNaN(id) || id < 1)
            res.status(500).send('Neprimeren ID');
        try {
            value.id = id;
            if (await new dbHelper.utilityBill({ id }).fetch() !== null)
                await new dbHelper.utilityBill(value).save(null, { method: 'update' });
            else
                await new dbHelper.utilityBill(value).save(null, { method: 'insert' });
            res.end();
        } catch (error) {
            res.status(500).json(error);
        }
    });
});

/*router.put('/paid/:id', (req, res, next) => {
    const billID = parseInt(req.params.id);

    if (isNaN(billID) || billID < 1)
        res.status(500).send('Neprimeren ID');
    try {
        await new dbHelper.utilityBill({id: billID}).save({paid: true}, {patch: true});
        res.end();
    } catch (error) {
        res.status(500).json(error);
    }
});*/

router.delete('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id < 1)
        res.status(500).send('Neprimeren ID');
    try {
        const data = await new dbHelper.utilityBill({ id }).destroy();
        res.json(data.toJSON());
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;