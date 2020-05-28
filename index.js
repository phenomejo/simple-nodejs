const express = require('express')
const mongoose = require('mongoose')
const cookie = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const constants = require('./config/keys')
require('./models/User')
require('./services/passport')

mongoose.connect(constants.MONGO_URL)

const app = express()

app.use(bodyParser.json())
app.use(
  cookie({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [constants.COOKIE_KEY]
  })
)

app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)

if (process.env.PORT === 'production') {
  app.use(express.static('client/build'))

  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const POST = process.env.PORT || 5000
app.listen(POST)