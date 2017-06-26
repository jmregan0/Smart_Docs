'use strict'
const morgan = require('morgan')
const api = module.exports = require('express').Router()

api
  .get('/heartbeat', (req, res) => res.send({ok: true}))
  .use('/analyze', require('./analyze'))
  .use('/research', require('./research'))


api.use(morgan('dev'))
// No routes matched? 404.
api.use((req, res) => res.status(404).end())
