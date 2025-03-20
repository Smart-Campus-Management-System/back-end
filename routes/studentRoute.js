const express = require('express');
const router = express.Router();
const { assignTutorToCourse } = require('../controllers/tutorController');
const { addStudent, getAll } = require('../controllers/studentController');
const { auth, isTutor, isAdmin} = require('../middlewares/authMiddleware');

// Route to assign tutor to a course
router.post('/add', auth, isAdmin, addStudent);
router.get('/all', getAll);

module.exports = router;
