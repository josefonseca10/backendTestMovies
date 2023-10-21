const http = require('http')
const https = require('https')
const fs = require('fs')
const cors = require('cors')
const express = require('express')
const asyncnify = require('express-asyncify')
const minimist = require('minimist')
const params = minimist(process.argv)
const { apiConfig } = require('./config/index')
const session = require('express-session');

// Declare routes
const userRoute = require('./src/routes/user');
const authmiddleware = require('./middleware/auth')
const moviesRoute = require('./src/routes/movies');
const commentsRoute = require('./src/routes/comments');



const app = asyncnify(express())
let server
if (params.prod && params.prod === 'true') {
  const privateKey = fs.readFileSync('/opt/openssl/nodejs.eeq.com.ec-key.pem',
    'utf8')
  const certificate = fs.readFileSync('/opt/openssl/nodejs.eeq.com.ec-crt.pem',
    'utf8')
  const ca = fs.readFileSync('/opt/openssl/nodejs.eeq.com.ec-crt.pem', 'utf8')
  const credentials = {
    key: privateKey,
    cert: certificate,
    ca,
  }
  server = https.createServer(credentials, app)
} else {
  server = http.createServer(app)
}

app.use(cors())
app.use(session({secret: 'nodejs-cas-client-demo'}));
app.use(express.json({limit:'60mb'}))
app.use(express.urlencoded({limit:'50mb'}))

// Use main paths
app.use('/user', userRoute)
app.use(authmiddleware)
app.use('/movies', moviesRoute);
app.use('/comments', commentsRoute);

function handledFatalError (err) {
  console.error(`[fatal error]: ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

if (!module.parent) {
  process.on('uncaughtException', handledFatalError)
  process.on('unhandledRejection', handledFatalError)
  server.listen(apiConfig.port, () => {
    console.log(`[api-server]: listening on port ${apiConfig.port}`)
  })
}

module.exports = server
