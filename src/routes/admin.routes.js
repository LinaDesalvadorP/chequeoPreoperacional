const express = require('express')

const router = express.Router()
const adminController = require('../controllers/admin.controller')

router.get('/get/:username', adminController.getAdmin)
router.get('/get-all', adminController.get_all)

router.post('/add', adminController.add)


module.exports = router;
