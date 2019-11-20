let pkg = require('../package.json')
let app = require('../index')
let express = require('express')
let router = express.Router()

/**
 * Router Middleware
 */

 // JWT TODO

/**
 * PUBLIC Endpoints
 */
app.get('/', (req, res, next) => {
  res.status(200).json({
    appName: pkg.name,
    version: pkg.version,
    env: process.env.NODE_ENV,
    up: process.uptime(),
    message: 'OK'
  })
})

app.use('/', require('../controllers/greetings.js'))
app.use('/', require('../controllers/goodbyes.js'))

/**
 * PRIVATE Endpoints
 */

 // export
module.exports = router