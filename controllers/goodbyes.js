let express = require('express')
let { AppLogicError } = require('../lib/Errors')

let router = express.Router()

router.route('/goodbye-in')
  .get((req, res, next) => {
    throw new AppLogicError(`Incorrect endpoint, you probably meant to use the endpoint '/goodbye-in/:language'`)  
  })

/**
 * GET /goodbye-in/:language
 * 
 * Send a goodbye back in response to the proivded language
 */
router.route('/goodbye-in/:language')
  .get((req, res, next) => {
  let language = req.params && req.params.language ? req.params.language.toLowerCase() : 'unknown' 
  let resMsg = ''

  switch(language) {
    case 'french':
      resMsg = 'Au revoir'
      break
    case 'english':
      resMsg = 'Goodbye'
      break
    case 'spanish':
      resMsg = 'Adiós'
      break
    default:
      resMsg = `Sorry, I don't know that language`
  }

  return res.status(200).json({
    language,
    message: resMsg
  })
})

module.exports = router