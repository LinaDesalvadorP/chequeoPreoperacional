const express = require('express')

const router = express.Router()
const testController = require('../controllers/quiz.controller')

router.get('/get', testController.getQuiz)
router.get('/get/today-quiz', testController.getTodayQuiz)
router.get('/get/initial-quiz', testController.getInitialQuiz)
router.get('/get/solved-today', testController.getTotalSolvedQuizToday)
router.get('/get/solved-in-month', testController.getTotalChecksInMonth)
router.get('/get/quiz-list', testController.getQuizList)
router.get('/get-quiz/:quizId', testController.getSolvedQuiz)


router.post('/save', testController.saveQuiz)


module.exports = router;
