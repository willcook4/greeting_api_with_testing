let jwt = require('jsonwebtoken')
/**
 * Generates a json web token for this User to interface with restricted API endpoints
 *
 * @param  {} User
 *
 * @return {String\JWT} token
 */
module.exports = function generateToken (user) {
  if (user) {
    if(!user.uuid) throw new Error('Unable to generate token, missing user uuid')
    // build what we want our jwt-packet to contain
    let seal = {
      userUuid: user.uuid,
      site: 'greetings-api'
    }
    return jwt.sign(seal, process.env.JWT_SECRET, { expiresIn: '1h' })
  } else {
    throw new Error('Unable to generate token')
  }
}
