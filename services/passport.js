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
    clientID: constants.GOOGLE_CLIENT_ID,
    clientSecret: constants.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    proxy: true
  },
  async (asscessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id })

    if (existingUser) {
      return done(null, existingUser)
    }

    const user = await new User({ googleId: profile.id }).save()
    return done(null, user)
    
  }
))