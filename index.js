const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send({ bye: 'buddy ' })
})

const POST = process.env.PORT || 5000
app.listen(POST)