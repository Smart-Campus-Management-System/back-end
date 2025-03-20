const Course = require('../models/Course');
const User = require('../models/User'); // Import the User model
const Tutor = require('../models/Tutor'); // Import the Tutor model

exports.assignTutorToCourse = async (req, res) => {
    const { courseId } = req.params; // Extract courseId from the URL
    const tutorId = req.user._id; // Get the tutor ID from the authenticated user (from the middleware)

    if (!courseId || !tutorId) {
        return res.status(400).json({ success: false, message: "Missing courseId or tutorId." });
    }

    try {
        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found." });
        }

        // Check if the tutor is already assigned (optional check)
        if (course.availableTutors.includes(tutorId)) {
            return res.status(400).json({ success: false, message: "Tutor is already assigned to this course." });
        }

        // Add tutor to the course's availableTutors array
        course.availableTutors.push(tutorId);
        await course.save();

        // Find the tutor (User) and update their courses array
        const tutor = await User.findById(tutorId);
        if (!tutor) {
            return res.status(404).json({ success: false, message: "Tutor not found." });
        }

        // Check if the course is already in the tutor's courses array
        if (!tutor.courses.includes(courseId)) {
            tutor.courses.push(courseId);
            await tutor.save();
        }

        return res.status(200).json({
            success: true,
            message: "Tutor assigned to course successfully.",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while assigning tutor.",
            error: error.message,
        });
    }
};

exports.addTutor = async (req, res)=>{
    try {
        const {name,email,expertise} = req.body;
        const tutor = await Tutor.create({
            name,
            email,
            expertise
        });
        res.status(201).json({
            success:true,
            message: "Tutor added successfully.",
            data:tutor
        })
    }catch (error){
        return res.status(500).json({
            success:false,
            message: "Error occurred while adding tutor.",
            error: error.message,
        })
    }
}

exports.getAll = async (req,res)=>{
    try {
        const tutors = await Tutor.find();
        res.status(200).json({
            success:true,
            message: "Tutors fetched successfully.",
            data:tutors
        })
    }catch (error){
        return res.status(500).json({
            success:false,
            message: "Error occurred while fetching tutors.",
            error: error.message,
        })

    }
}