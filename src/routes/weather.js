'use strict';
const express = require('express')
const router = express.Router()

const weatherController = require('../controllers/weatherController')

const { cacheHandler } = require('../middlewares/cacheHandler')

const Redis = require('../utils/redis')

const redis = new Redis()

router.post('/weather', cacheHandler, async(req, res, next) => {
    try {
        const { latitude, longitude } = req.body

        const { data } = await weatherController.main(latitude, longitude)

        const searchKey = `${latitude}${longitude}`

        const cacheExp = process.env.REDIS_CACHE_EXP

        await redis.save(searchKey, cacheExp, data.toString());

        res.json(setWeatherData(data));
    } catch (e) {
        e.statusCode = 500
        next(e)
    }
})


function setWeatherData(data) {
    return {
        locationElement: data.place,
        statusElement: data.summary,
        temperatureElement: data.temperature,
        precipitationElement: `${data.precipProbability * 100}%`,
        windElement: data.windSpeed
    }
}



module.exports = router
