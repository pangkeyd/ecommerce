const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const cors = require('cors')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Route

const item = require('./routers/item')

app.use('/item', item)

app.listen(3000, () => {
  console.log('AYO JALAN!')
})
