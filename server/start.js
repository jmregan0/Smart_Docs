'use strict'
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const {resolve} = require('path')
const PrettyError = require('pretty-error')
const finalHandler = require('finalhandler')
const morgan = require('morgan');

const app = express()


module.exports = app

  // Body parsing
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())

  // Morgan
  .use(morgan('dev'))

  // Static
  .use(express.static(resolve(__dirname, '..', 'public')))

  // let that Cross-Origin stuff through baby
  .use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X_Requested-With, Content-Type, Accept");
    next();
  })

  // Serve our api
  .use('/api', require('./api'))

  // any requests with an extension (.js, .css, etc.) turn into 404
  .use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // Send index.html for anything else.
  .get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')))

  // Error middleware interceptor, delegates to same handler Express uses.
  .use((err, req, res, next) => {
    res.send(console.error(err))
  })

  // start that shit up
  .listen(3000, console.log('listening on 3000!'))

