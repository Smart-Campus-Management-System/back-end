const express = require('express');
const router = express.Router();
const { assignTutorToCourse,addTutor, getAll } = require('../controllers/tutorController');
const { auth, isTutor } = require('../middlewares/authMiddleware');

// Route to assign tutor to a course
router.post('/assign/:courseId', auth, isTutor, assignTutorToCourse);
router.post('/',addTutor);
router.get('/all',getAll);

module.exports = router;
