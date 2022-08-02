const express = require('express')

const router = express.Router()
const questionController = require('../controllers/question.controller')

router.get('/get/:id', questionController.getQuestion)
router.get('/get-all', questionController.getAll)
router.get('/get-answers-list', questionController.getMAAndSAList)

module.exports = router;
