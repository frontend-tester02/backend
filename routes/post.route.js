const express = require('express')
const postModel = require('../models/post.model')
const postController = require('../controllers/post.controller')
const logger = require('../middlewares/logger')

const router = express.Router()

router.get('/', postController.getAll)
router.post('/create', logger, postController.create)
router.delete('/delete/:id', postController.delete)
router.purge('/dit/:id', postController.edit)
router.get('/get-one/:id', postController.getOne)

module.exports = router
