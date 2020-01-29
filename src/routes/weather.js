'use strict';
const express = require('express')
const router = express.Router()

const weatherController = require('../controllers/weatherController')

const Redis = require('../utils/redis')

const redis = new Redis()

router.post('/weather', cache, async(req, res, next) => {
    try {
        const { latitude, longitude } = req.body

        const { data } = await weatherController.main(latitude, longitude)

        const searchKey = `${latitude}${longitude}`

        const cacheExp = process.env.REDIS_CACHE_EXP

        await redis.save(searchKey, cacheExp, data.currently);

        res.send(setResponse(searchKey, data.currently));
    } catch (e) {
        e.statusCode = 500
        next(e)
    }
})


// Cache middleware
async function cache(req, res, next) {
    const { latitude, longitude } = req.params;
    const searchKey = `${latitude}${longitude}`

    const data = await redis.get(searchKey)
    console.log('data', data)
    try {
        if (data !== null) {
            res.send(setResponse(username, data));
        } else {
            next();
        }
    } catch (error) {
        next(error)
    }

}

function setResponse(searchKey, response) {
    return `<h2> search Key:${searchKey}</h2>`;
}



module.exports = router
