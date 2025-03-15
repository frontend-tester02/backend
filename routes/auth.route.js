const express = require('express')
const authController = require('../controllers/auth.controller')
const { body } = require('express-validator')
const authMiddlerware = require('../middlewares/auth.middlerware')

const router = express.Router()

router.post(
	'/register',
	body('email').isEmail(),
	body('password').isLength({ min: 3, max: 30 }),
	authController.register
)
router.get('/activation/:id', authController.activation)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.post('/refresh', authController.refresh)
router.get('/get-users', authMiddlerware, authController.getUser)

module.exports = router
