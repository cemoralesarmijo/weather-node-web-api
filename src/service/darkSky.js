const axios = require("axios");

const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY;
const DARKSKY_URL = process.env.DARKSKY_URL;

/**
 * - Forecast service from  dark sky API
 * @param {String} latitude 
 * @param {String} longitude 
 */
async function forecast(latitude, longitude) {

    let options
    try {

        options = {
            method: "GET",
            url: `${DARKSKY_URL}/${DARKSKY_API_KEY}/${latitude},${longitude}?units=auto`,
            headers: {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "dark-sky.p.rapidapi.com",
                "x-rapidapi-key": DARKSKY_API_KEY
            },
            params: {
                lang: "en",
                units: "auto"
            }
        }

        const response = await axios(options)
        return {
            success: true,
            message: 'Petición externa con servicio darkSky realizada exitósamente',
            data: response.data,
            optionsRequest: options

        }

    } catch (error) {
        return {
            success: false,
            message: 'Error externo de comunicación con servicio darkSky',
            error: error
        }
    }
}

module.exports = {
    forecast
}