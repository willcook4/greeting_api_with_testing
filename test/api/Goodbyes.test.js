let expect = require('chai').expect

describe('Goodbye Endpoints', () => {
  test('goodbye-in/french Endpoint should return with data', async function(done) { 
    api.get('/goodbye-in/french')
       .expect(200)
       .expect('Content-Type', /json/)
       .end((err, res) => {
          if (err) throw err
          expect(res.body).to.have.property('message', 'Au revoir')
          done()
      })
  })

  test('goodbye-in/wdkgldgklmf Endpoint should return an unknown language response', async function(done) {
    api.get('/goodbye-in/wdkgldgklmf')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if(err) throw err
        expect(res.body).to.have.property('message', "Sorry, I don't know that language")
        done()
      })
  })

  test('goodbye-in/ or goodbye-in Endpoint should return an error for missing language', async function(done) {
    api.get('/goodbye-in')
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if(err) throw err
        expect(res.body).to.have.property('code', 'app.logic.error')
        expect(res.body).to.have.property('errors', `Incorrect endpoint, you probably meant to use the endpoint \'/goodbye-in/:language\'`)
        done()
      })
  })
})