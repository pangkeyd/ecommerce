const express = require('express')
const router = express.Router()
const Item = require('../controllers/item')
const multer = require('multer')
const upload = multer({
  dest: '../client/static/image_item/'
})

router.get('/', Item.getData)

router.get('/:_id', Item.getDataById)

router.post('/', upload.single('image'), Item.saveData)

module.exports = router
