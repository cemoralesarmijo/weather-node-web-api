'use strict'

async function errorHandler(err, req, res, next) {

    if (process.env.NODE_ENV == "development") {
        const chalk = require('chalk')
        console.log(chalk.red.underline.bold('\nD E B U G  E R R O R  H A N D L E R:\n'))
        console.log(chalk.green.bold('name:'), chalk.yellow.italic(err.name))
        console.log(chalk.green.bold('message:'), chalk.yellow.italic(err.message))
        console.log(chalk.green.bold('err:'), chalk.yellow.italic(err))
        console.log(chalk.green.bold('stack:'), chalk.yellow.italic(err.stack))
    }
    if (err) {
        res.statusCode = err.statusCode || 500
        let response = {
            success: false,
            message: ' Internal server error',
            name: err.name,
            stack: err.stack
        }
        res.send(response)
    }
    next()
}

module.exports = {
    errorHandler
}
