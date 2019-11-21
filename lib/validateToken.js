let jwt = require('jsonwebtoken')
/**
 * Validated a json web token for this User to interface with restricted API endpoints
 *
 * @param  {String} token
 *
 * @return {Object} keys status
 */

module.exports = function validateToken (token) {
  if (token) {
    try {
      return { valid: true, ...jwt.verify(token, process.env.JWT_SECRET) }
    } catch(err) {
      return {
        valid: false,
        ...err
      }
    }
  } else {
    throw new Error('Unable to validate token')
  }
}
