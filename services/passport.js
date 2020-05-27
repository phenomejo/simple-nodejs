const passport = require('passport')
const GoogleStrategy = require( 'passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const constants = require('../config/keys')

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

passport.use(new GoogleStrategy({
    clientID: constants.CLIENT_ID,
    clientSecret: constants.CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    proxy: true
  },
  (asscessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }).then((existingUser) => {
      if (existingUser) {
        done(null, existingUser)
      } else {
        new User({ googleId: profile.id }).save().then((user) => {
          done(null, user)
        })
      }
    })
  }
))