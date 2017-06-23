//require firebase instance
const firebase = require('../fire/index.js')
const secrets = require('../secrets.js')
const axios = require('axios')

module.exports = require('express').Router()

.post('/entity', (req, res, next) => {
  console.log('hit the entity route')
  console.log('here is the req.body', req.body)
  var instance = axios.create({
      headers: {
        'X-RosetteAPI-Key': secrets.rosetteApi,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': 'http://localhost:5000'
      }
    });

    instance.post('https://api.rosette.com/rest/v1/entities',
    { content: req.body.text })
    .then(data=> {
      res.status(200).json(data.data)
      // res.send('response:', data.data);
    })
    .catch(error=>{
      next(console.error('looks like an error:',error))
    });
})





