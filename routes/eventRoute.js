const express = require('express')
const router = express.Router()
const eventController = require('../controllers/eventController')

router.post('/',eventController.addEvent)
router.get('/all',eventController.getAll)
router.delete('/:id',eventController.deleteEvent)

module.exports = router