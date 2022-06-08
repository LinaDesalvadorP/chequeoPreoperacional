const express = require('express')

const router = express.Router()
const testController = require('../controllers/test.controller')

router.get('/get/unsolved-test', testController.getUnsolvedTest)


module.exports = router;
