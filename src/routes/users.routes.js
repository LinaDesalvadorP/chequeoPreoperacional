const express = require('express')

const router = express.Router()
const userController = require('../controllers/users.controller')

router.get('/exist/:userId', userController.exist)

router.post('/login', userController.login);
router.post('/add', userController.create);
router.post('/ban-user', userController.banUser);
router.post('/unban-user', userController.unbanUser);

module.exports = router;
