const express = require('express')

const router = express.Router()
const ownerController = require('../controllers/owner.controller')

//router.get('/get/:cc', ownerController.getOwner)
 router.get('/get-all', ownerController.getAll)

router.post('/add', ownerController.add)

module.exports = router;
