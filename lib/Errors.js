function ApiValidationError (errors, options, attributes, constraints) {
  Error.captureStackTrace(this, this.constructor)
  this.code = 'api.error.validation'
  this.errors = errors

  // TODO - remove these attributes in production
  this.options = options
  // this.attributes = attributes
  // this.constraints = constraints
}
ApiValidationError.prototype = new Error()


function AppLogicError (errors, options, attributes, contraints) {
  Error.captureStackTrace(this, this.constructor)
  this.code = 'app.logic.error'
  this.errors = errors

  this.options = options
}
AppLogicError.prototype = new Error()

module.exports.AppLogicError = AppLogicError
module.exports.ApiValidationError = ApiValidationError