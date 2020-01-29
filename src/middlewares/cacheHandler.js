'use strict'

const Redis = require('../utils/redis')

const redis = new Redis()

async function cacheHandler(req, res, next) {

    console.log('Estoy en el cache handler')

    const { latitude, longitude } = req.params;
    const searchKey = `${latitude}${longitude}`

    let data = await redis.get(searchKey)

    data = JSON.parse(data)

    try {
        if (data !== null) {
            res.send(setWeatherData(data));
        } else {
            next();
        }
    } catch (error) {
        next(error)
    }
}

function setWeatherData(data) {
    return {
        locationElement: data.place,
        statusElement: data.summary,
        temperatureElement: data.temperature,
        precipitationElement: `${data.precipProbability * 100}%`,
        windElement: data.windSpeed
    }
}

module.exports = {
    cacheHandler
}
