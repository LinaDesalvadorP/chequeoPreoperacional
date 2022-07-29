const express = require('express')

const router = express.Router()
const sectionController = require('../controllers/sections.controller')

router.get('/get-all', sectionController.getAll)
module.exports = router;
