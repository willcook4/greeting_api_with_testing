let expect = require('chai').expect
let generateToken = require('../../lib/generateToken')

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
})
  