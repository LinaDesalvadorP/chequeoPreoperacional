const express = require('express')

const router = express.Router()
const userController = require('../controllers/users.controller')

router.get('/user/exist/:userId', userController.exist)
router.post('/login', userController.login);
router.post('/add', userController.create);

module.exports = router;
