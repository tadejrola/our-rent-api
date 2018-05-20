const express = require('express');
const router = express.Router();
let accountModel = require('../models/accountModel');
const dbHelper = require('../helpers/dbHelper');
const Joi = require('joi');

router.post('/login', (req, res, next) => {
    Joi.validate(req.body, accountModel, async function (err, value) {
        if (err !== null)
            res.status(500).send(err);
        try {
            const data = await new dbHelper.user({
                email: value.email,
                password: value.password
            }).fetch();
            if (data !== null)
                res.json(data.id);
            else
                res.json(false);
        } catch (error) {
            res.status(500).json(error);
        }
    });
});

router.post('/register', (req, res, next) => {
    Joi.validate(req.body, accountModel, async function (err, value) {
        if (err !== null)
            res.status(500).send(err);
        try {
            const data = await new dbHelper.user({
                email: value.email
            }).fetch();
            if (data === null) {
                await new dbHelper.user(value).save();
                res.json(true);
            }
            else
                res.json("User with the same email already exists!");
        } catch (error) {
            res.status(500).json(error);
        }
    });
});

module.exports = router;