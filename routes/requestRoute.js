const express = require('express');
const requestController = require('../controllers/requestController');
const authController = require('../controllers/authController');
const router = express.Router();

// Routes accessible to all authenticated users
// We'll assume your authController has some form of authentication middleware
router.route('/')
    .post(requestController.createClassRequest)
    .get(requestController.getAllClassRequests);

router.route('/:id')
    .get(requestController.getClassRequest)
    .delete(requestController.deleteClassRequest);

// Routes that require instructor/admin role
// Instead of using router.use(), we'll apply the role check directly to each route
router.route('/handle-request/:id')
    .post(checkInstructorAdmin, requestController.handleClassRequest);

router.route('/zoom-link/:id')
    .patch(checkInstructorAdmin, requestController.updateZoomLink);

// Role checking middleware function
function checkInstructorAdmin(req, res, next) {
    // Check if user has the right role
    if (req.user && (req.user.role === 'instructor' || req.user.role === 'admin')) {
        return next();
    }
    return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to perform this action'
    });
}

module.exports = router;
