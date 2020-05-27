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
  async (asscessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleID: profile.id })

    if (!existingUser) {
      const user = await new User({ googleID: profile.id }).save()
      return done(null, user)
    }

    done(null, existingUser)
    // User.findOne({ googleId: profile.id }).then((existingUser) => {
    //   if (existingUser) {
    //     done(null, existingUser)
    //   } else {
    //     new User({ googleId: profile.id }).save().then((user) => {
    //       done(null, user)
    //     })
    //   }
    // })
  }
))