let jwt = require('jsonwebtoken')

/**
 * Middleware to ensure that a JWT token is present
 */

 module.exports = function(req, res, next) {
     // check header or url parameters or post parameters for token
  let token = req.body.token || req.query.token || req.headers['x-access-token']
  // decode token
  if (token) {
    // // verifies secret and checks expiry
    // jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    //   if (err) {
    //     if (err.message === 'jwt expired') {
    //       return res.status(401).json({
    //         errors: 'Session has expired'
    //       })
    //     }

    //     return res.status(401).json({
    //       errors: 'Failed to authenticate token.'
    //     })
    //   } else {
    //     // if everything is good, save to request for use in other routes
    //     // console.log(JSON.stringify(decoded, null, 2))
    //     req.context = decoded
    //     next()
    //   }
    // })
  } else {
    // no token return an error
    return res.status(401)
              .json({
                      errors: 'No token provided'
                    })
  }
 }