const path = require('path')
    // const bodyParser = require('body-parser');
const express = require("express")
const server = require('./bin/runServer')
const routes = require('./routes')
const { errorHandler } = require('./middlewares/errorHandler')

const app = express()

// app.use(bodyParser.urlencoded({
//     extended: false
// }));

// app.use(bodyParser.json({ type: 'application/json' }));


app.use(express.json())
app.use('/api', routes)



app.use((req, res, next) => {
    const err = new Error('Not Found')
    res.statusCode = 404
    next(err)
});

app.use(errorHandler);

module.exports = server(app);
