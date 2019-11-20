// Setup Environment variables
require('dotenv-safe').config()

let supertest = require('supertest')
let api = supertest(`http://localhost:${process.env.API_PORT}`)

// Make the api public for testing
global.api = api