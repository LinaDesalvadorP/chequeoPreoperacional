const express = require('express')

const router = express.Router()
const vehiclesController = require('../controllers/vehicle.controller')

router.post('/add', vehiclesController.add)


module.exports = router;
