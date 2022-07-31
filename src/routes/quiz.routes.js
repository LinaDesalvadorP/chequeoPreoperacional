const express = require('express')

const router = express.Router()
const testController = require('../controllers/quiz.controller')

router.get('/get/quiz-type/:license', testController.getQuiz)
router.get('/get/today-quiz', testController.getTodayQuiz)
router.get('/get/initial-quiz', testController.getInitialQuiz)
router.get('/get/solved-today', testController.getTotalSolvedQuizToday)
router.get('/solved-in-month', testController.getTotalChecksInMonth)
router.get('/get/quiz-list', testController.getQuizList)
router.get('/get-quiz/:quizId', testController.getSolvedQuiz)


router.post('/save', testController.saveQuiz)
router.post('/get/solved-in-month', testController.getTotalChecksInMonth)


module.exports = router;
