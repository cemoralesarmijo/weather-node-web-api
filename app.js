if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
  const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY
  const DARKSKY_URL = process.env.DARKSKY_URL

  const axios = require('axios')
  const express = require('express')
  const app = express()
  
  app.use(express.json())

  app.post('/weather', (req, res) => {
    const url = `${DARKSKY_URL}/${DARKSKY_API_KEY}/${req.body.latitude},${req.body.longitude}?units=auto`
    axios({
      url: url,
      responseType: 'json'
    }).then(data => {
      console.log(req.body)
      res.json(data.data.currently)
    })
  })
  
  app.listen(3000, () => {
    console.log('Server Started')
  })