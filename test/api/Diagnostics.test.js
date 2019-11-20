let expect = require('chai').expect

describe('Diagnostic Endpoints', () => {
  test('Endpoint should return with diagnostic data', async function(done) { 
    api.get('/')
       .expect(200)
       .expect('Content-Type', /json/)
       .end((err, res) => {
          if (err) throw err
          expect(res.body).to.have.property('message', 'OK')
          done()
      })
  })
})