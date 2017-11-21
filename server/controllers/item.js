const item = require('../models/item')

class Item {

  static getData(req, res){
    item.getItem(result => {
      res.send(result)
    })
  }

  static getDataById(req, res){
    item.getItemById(req.params, (result) => {
      res.send(result)
    })
  }

  static saveData(req, res){
    item.saveItem(req.body, req.file.filename, (result) => {
      res.send(result)
    })
  }

}

module.exports = Item
