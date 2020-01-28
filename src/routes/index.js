const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const basename = path.basename(module.filename);

/**
 * Only filter js file
 * @file: name of file
 */
function filter(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}

/**
 * Load file logistic
 * @file: name of file
 */
function logistic(file) {
    const route = require(path.join(__dirname, file));
    app.use('/', route);
}

fs.readdirSync(__dirname).filter(filter).forEach(logistic);

module.exports = app;
