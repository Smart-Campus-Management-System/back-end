const Student = require("../models/Student");
exports.addStudent = async (req, res) => {

    try {
        const { name, email, subject } = req.body

        const newStudent = await Student.create({

            name: name,
            email: email,
            subject: subject

        })

        res.status(201).json({
            success: true,
            message: "student successfully created!",
            data: newStudent,
        })
    }

    catch (e) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while creating the section.",
            error: e.message,
        });
    }


}

exports.getAll = async (req, res) => {
    try {

        const response = await Student.find();
        return res.status(200).json({
            success: true,
            data: response
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        })
    }
}