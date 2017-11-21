const mongoose = require('mongoose')
const URI = process.env.DB_NAME
const Schema = mongoose.Schema

mongoose.connect(URI, { useMongoClient: true })

var item = new Schema({
  name: String,
  price: Number,
  image: String
})

var Item = mongoose.model('Item', item)

function getItem(cb){
  Item.find({}, (err, item) => {
    if(err){
      res.status(200).send(err)
    }
    cb(item)
  })
}

function getItemById(params, cb){
  Item.find({
    _id: params._id
  }, (err, item) => {
    if(err){
      res.status(200).send(err)
    }
    cb(item)
  })
}

function saveItem(body, file, cb){
  let itemSchema = new Item({
    name: body.name,
    price: body.price,
    image: file
  })
  itemSchema.save((err, item) => {
    if(err){
      res.status(200).send(err)
    }
    cb(item)
  })
}

module.exports = {
  getItem,
  getItemById,
  saveItem
}
