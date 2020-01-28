const { forecast } = require('../service/darkSky');

async function main(req) {
    try {

        const resWeather = await forecast(req.body.latitude, req.body.longitude)

        if (!resWeather.success) {
            return resWeather
        }

        // sigo con respuesta exitosa
        return resWeather

    } catch (error) {
        throw error
    }
}

module.exports = {
    main
}
