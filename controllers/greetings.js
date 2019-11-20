let express = require('express')
let { AppLogicError } = require('../lib/Errors')

let router = express.Router()

router.route('/greeting-in')
  .get((req, res, next) => {
    throw new AppLogicError(`Incorrect endpoint, you probably meant to use the endpoint '/greeting-in/:language'`)  
  })

/**
 * GET /greeting-in/:language
 * 
 * Send a greeting back in response to the proivded language
 */
router.route('/greeting-in/:language')
  .get((req, res, next) => {
  let language = req.params && req.params.language ? req.params.language.toLowerCase() : 'unknown' 
  let resMsg = ''

  switch(language) {
    case 'french':
      resMsg = 'Bonjour'
      break
    case 'english':
      resMsg = 'Hello'
      break
    case 'spanish':
      resMsg = 'Hola'
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