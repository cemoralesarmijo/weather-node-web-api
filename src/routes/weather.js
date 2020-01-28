'use strict';
const express = require('express')
const router = express.Router()

const weatherController = require('../controllers/weatherController')



router.post('/weather', async(req, res, next) => {
    try {
        const response = await weatherController.main(req)
        res.json(response)
    } catch (e) {
        e.statusCode = 500
        next(e)
    }
});

module.exports = router