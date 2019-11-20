// Setup Environment variables
require('dotenv-safe').config()

// Packages
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const tcpPortUsed = require('tcp-port-used')

// Local files
const pkg = require('./package.json')

// Constants
const API_PORT = process.env.API_PORT ? parseInt(process.env.API_PORT) : 5000

// Export app so it can be used anywhere
const app = module.exports = express()

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))
// Parse application/json
app.use(bodyParser.json({limit: '10mb'}))

/**
 * Middleware
 */

// Help secure Express apps with constious HTTP headers
app.use(helmet())

// Enable CORS
app.use(cors({
  origin: true,
  credentials: true // pass with header
}))

// Routes via config file
app.use('/', require('./config/routes'))

/**
 * Validation Error Middleware
 *
 * Errors need to be consistant so the interfaces can present the info
 * back to the end use.
 */
app.use(function (err, req, res, next) {
  if (err.code === 'api.error.validation') {
    return res.status(400).json(err)
  }
  next(err)
})

/**
 * App Business Logic Error Middleware
 */
app.use(function (err, req, res, next) {
  if (err.code === 'app.logic.error') {
    return res.status(400).json(err)
  }
  next(err)
})

/**
 * Unhandled errors
 */
app.use(function (err, req, res, next) {
  console.log('Unhandled error', err)
  return res.status(500).json(err)
})

/** Server */
tcpPortUsed.check(API_PORT, '127.0.0.1')
  .then(() => {
    const server = app.listen(API_PORT, function() {
      console.log(`node version: ${process.version}`)
      console.log(`API server listening on port ${API_PORT}`)
      console.log(`API version ${pkg.version}`)
    })
  })

// Log details of any uncaught exceptions
process.on('uncaughtException', function (err) {
  console.error('[server:err]')
  console.error('[server:err]')
  console.error('[server:err]')
  console.trace(err)
})
