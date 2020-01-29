const { forecast } = require('../service/darkSky');

async function main(latitude, longitude) {
    try {
        const resWeather = await forecast(latitude, longitude)

        return resWeather

    } catch (error) {
        throw error
    }
}

module.exports = {
    main
}
