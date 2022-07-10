const express = require('express')

const router = express.Router()
const vehiclesController = require('../controllers/vehicle.controller')

router.get('/get-all', vehiclesController.getAll)
router.get('/get/:licensePlate', vehiclesController.get)

router.post('/add', vehiclesController.add)
router.post('/modify', vehiclesController.modify)

module.exports = router;
