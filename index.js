const express = require('express')
const mongoose = require('mongoose')
const cookie = require('cookie-session')
const passport = require('passport')
const constants = require('./config/keys')
require('./models/User')
require('./services/passport')

mongoose.connect(constants.MONGO_URL)

const app = express()

app.use(
  cookie({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [constants.COOKIE_KEY]
  })
)

app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)

const POST = process.env.PORT || 5000
app.listen(POST)