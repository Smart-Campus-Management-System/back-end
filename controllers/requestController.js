const ClassRequest = require('../models/ClassRequest');
const Course = require('../models/Course');


exports.createClassRequest = async (req, res, next) => {
    try {
        const { courseId, time, notes } = req.body;

        // Check if course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                status: 'fail',
                message: 'Course not found'
            });
        }

        // Create new class request
        const classRequest = await ClassRequest.create({
            student: req.user.id,
            course: courseId,
            time,
            notes,
            status: 'Pending'
        });

        res.status(201).json({
            status: 'success',
            data: {
                classRequest
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.getAllClassRequests = async (req, res, next) => {
    try {
        // For instructors/admins - get all requests
        // For students - get only their requests
        const filter = req.user.role === 'student' ? { student: req.user.id } : {};

        const classRequests = await ClassRequest.find(filter)
            .populate({
                path: 'student',
                select: 'name email'
            })
            .populate({
                path: 'course',
                select: 'courseName'
            })
            .sort('-createdAt');

        res.status(200).json({
            status: 'success',
            results: classRequests.length,
            classRequests
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.getClassRequest = async (req, res, next) => {
    try {
        const classRequest = await ClassRequest.findById(req.params.id)
            .populate({
                path: 'student',
                select: 'name email'
            })
            .populate({
                path: 'course',
                select: 'courseName'
            });

        if (!classRequest) {
            return res.status(404).json({
                status: 'fail',
                message: 'Class request not found'
            });
        }

        // Check if user is authorized to view this request
        if (
            req.user.role === 'student' &&
            classRequest.student._id.toString() !== req.user.id
        ) {
            return res.status(403).json({
                status: 'fail',
                message: 'You are not authorized to view this request'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                classRequest
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.handleClassRequest = async (req, res, next) => {
    try {
        const { status } = req.body;

        if (!['Accepted', 'Declined'].includes(status)) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid status value'
            });
        }

        // Find and update the class request
        const classRequest = await ClassRequest.findByIdAndUpdate(
            req.params.id,
            { status },
            {
                new: true,
                runValidators: true
            }
        );

        if (!classRequest) {
            return res.status(404).json({
                status: 'fail',
                message: 'Class request not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                classRequest
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.updateZoomLink = async (req, res, next) => {
    try {
        const { zoomLink } = req.body;

        // Find and update the class request
        const classRequest = await ClassRequest.findById(req.params.id);

        if (!classRequest) {
            return res.status(404).json({
                status: 'fail',
                message: 'Class request not found'
            });
        }

        if (classRequest.status !== 'Accepted') {
            return res.status(400).json({
                status: 'fail',
                message: 'Cannot add Zoom link to request that is not accepted'
            });
        }

        classRequest.zoomLink = zoomLink;
        await classRequest.save();

        res.status(200).json({
            status: 'success',
            data: {
                classRequest
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.deleteClassRequest = async (req, res, next) => {
    try {
        const classRequest = await ClassRequest.findById(req.params.id);

        if (!classRequest) {
            return res.status(404).json({
                status: 'fail',
                message: 'Class request not found'
            });
        }

        // Only allow students to delete their own requests that are still pending
        if (
            req.user.role === 'student' &&
            (classRequest.student._id.toString() !== req.user.id ||
                classRequest.status !== 'Pending')
        ) {
            return res.status(403).json({
                status: 'fail',
                message: 'You cannot delete this request'
            });
        }

        await ClassRequest.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};
