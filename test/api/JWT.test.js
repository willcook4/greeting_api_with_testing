let moment = require('moment')
let jwt = require('jsonwebtoken')
let expect = require('chai').expect
let generateToken = require('../../lib/generateToken')
let validateToken = require('../../lib/validateToken')

describe('JWT testing', () => {
  test('generateToken should throw an error if no user is provided', function(done) {
    expect(generateToken).to.throw(Error)
    done()
  })

  test('generateToken should throw an error if no user uuid is provided', function(done) {
    expect(function() { generateToken({})}).to.throw(Error)
    done()
  })

  test('JWT generates a token string when provided with a user object with a uuid key', async function(done) {
    let testUser = { // testing data
      uuid: 'b087db98-99ef-490e-b93b-c6c56a9f7a6d',
      firstName: 'Will',
      lastName: 'Cook'
    }
    expect( generateToken(testUser) ).to.be.a('string')
    done()
  })

  test('JWT validation should throw an error if not provided with a token', function(done){
    expect(function() { validateToken()}).to.throw(Error)
    done()
  })

  test('Generated JSON Web Tokens can be validated to return the validity(vaild), expiry(exp), issued-at(iat), site-id(site) and useruuid', async function(done){
    let testUser = { // testing data
      uuid: 'b087db98-99ef-490e-b93b-c6c56a9f7a6d'
    }

    let generatedToken = generateToken(testUser)
    let validatedToken = validateToken(generatedToken)

    expect(validatedToken).to.have.keys(['exp', 'iat', 'site','userUuid', "valid"])
    done()
  })

  test('Generated JSON Web Tokens are validated as false if they have expired ', async function(done) {
    let testUser = {
      uuid: 'b087db98-99ef-490e-b93b-c6c56a9f7a6d'
    }

    let generatedToken = generateToken(testUser, 1) // Expire the token in 1 millisecond

    // Promise timeout function
    function timeout(fn, delay) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            fn();
            resolve();
          } catch(err) {
            reject(err);
          } 
        }, delay);
      });
    }

    // Wait for 2 seconds and then validate the token
    return timeout(() => {
      let validatedToken = validateToken(generatedToken)
      expect(validatedToken.valid).to.be.false
      done()
    }, 1100);
  })

  test('Generated JSON Web Tokens are generated with the iat before the expiry', async function(done) {
    let testUser = {
      uuid: 'b087db98-99ef-490e-b93b-c6c56a9f7a6d'
    }

    let generatedToken = generateToken(testUser, '1h') // expire in an hour, iat: +2hr
    let validatedToken = validateToken(generatedToken)

    expect(validatedToken.iat).to.be.below(validateToken.exp)
    done()
  })
})
  