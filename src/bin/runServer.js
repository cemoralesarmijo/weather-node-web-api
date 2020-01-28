#!/usr/bin/env node

require('dotenv').config();
const chalk = require('chalk');

module.exports = (app) => {
    const port = process.env.PORT || 3000;
    const nodeEnv = process.env.NODE_ENV
    app.listen(port, function() {
        console.log(chalk.cyan(`\n\n ** Example app listening on PORT:${chalk.yellow.italic(port)}, using NODE_ENV:${chalk.yellow.italic(nodeEnv)}\n\n`));
    });
};
