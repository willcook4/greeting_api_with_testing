let jwt = require('jsonwebtoken')
/**
 * Generates a json web token for this User to interface with restricted API endpoints
 *
 * @param  {Object} User
 * @param  {Integer/String} expiresIn ::optional // Eg: 60, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc), otherwise milliseconds unit is used by default ("120" is equal to "120ms").
 * @param  {Integer/String} iat ::optional // Eg: 60, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc), otherwise milliseconds unit is used by default ("120" is equal to "120ms").
 * @return {String\JWT} token
 */
module.exports = function generateToken (user, expiresIn=process.env.JWT_TOKEN_EXPIRY, iat) {
  if (user) {
    if(!user.uuid) throw new Error('Unable to generate token, missing user uuid')
    // build what we want our jwt-packet to contain
    let seal = {
      userUuid: user.uuid,
      site: 'greetings-api'
    }

    if(iat) seal.iat = iat // iat === issued at
    
    return jwt.sign(seal, process.env.JWT_SECRET, { expiresIn: expiresIn})
  } else {
    throw new Error('Unable to generate token')
  }
}
