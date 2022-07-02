const express = require('express')

const router = express.Router()
const testController = require('../controllers/quiz.controller')

router.get('/get/today-quiz', testController.getUnsolvedQuiz)


module.exports = router;
