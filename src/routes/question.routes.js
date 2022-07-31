const express = require('express')

const router = express.Router()
const questionController = require('../controllers/question.controller')

router.get('/get/:id', questionController.getQuestion)

module.exports = router;
