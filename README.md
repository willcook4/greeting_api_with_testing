# Greetings API
Built with Node and Jest as the framework for Chai testing.

## What is it?
An API where endpoints provide language information. The idea is that the project is standalone and doesn't require a database. This may change later.

## What does it do?

- ```
  GET http://localhost:9000
  ```
  will return basic api diagnostics

- ```
  GET http://localhost:9000/greeting-in/LANGUAGE
  ```
  will return a greeting in the provided LANGUAGE

- ```
  GET http://localhost:9000/goodbye-in/LANGUAGE
  ```
  will return a goodbye in the provided LANGUAGE



## How to setup
- Clone this repo
- Install the packages ```yarn install`
- Start the api with ```yarn dev``` Note, this requires a global nodemon installation.
  You could also start with ```node index.js```

## What testing is there?  

- Chai tests are currently dependent on the 

## TODO's

- [x] - Add sample route(s) for getting a public api req/res
- [x] - Add tests for the sample route for getting a public api req/res
- [] - Add JWT token generation
- [] - Add tests for JWT token generation
- [] - Add JWT token validation
- [] - Add tests for JWT token validation
- [] - Add register route
- [] - Add login route
- [] - Add forgot password route
- [] - Add example private routes accessible only with the token
- [] - Add roles and restrictions via an ACL(Access control list) style. e.g. admin, user, guest