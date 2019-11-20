let expect = require('chai').expect

describe('Greetings Endpoints', () => {
  test('greeting-in/french Endpoint should return with data', async function(done) { 
    api.get('/greeting-in/french')
       .expect(200)
       .expect('Content-Type', /json/)
       .end((err, res) => {
          if (err) throw err
          expect(res.body).to.have.property('message', 'Bonjour')
          done()
      })
  })

  test('greeting-in/wdkgldgklmf Endpoint should return an unknown language response', async function(done) {
    api.get('/greeting-in/wdkgldgklmf')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if(err) throw err
        expect(res.body).to.have.property('message', "Sorry, I don't know that language")
        done()
      })
  })

  test('greeting-in/ or greeting-in Endpoint should return an error for missing language', async function(done) {
    api.get('/greeting-in')
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if(err) throw err
        expect(res.body).to.have.property('code', 'app.logic.error')
        expect(res.body).to.have.property('errors', `Incorrect endpoint, you probably meant to use the endpoint \'/greeting-in/:language\'`)
        done()
      })
  })
})