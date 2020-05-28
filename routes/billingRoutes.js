const constants = require('../config/keys')
const stripe = require('stripe')(constants.STRIPE_SECRET_KEY)
const requireLogin = require('../middlewares/requiredLogin')

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for credit',
      source: req.body.id
    })

    req.user.credits += 5
    const user = await req.user.save()
    res.send(user)
  })
}