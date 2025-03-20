const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Controller to get logged-in tutor's profile details
const getTutorProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming req.user is set after authentication

        // Find the user with accountType: "Tutor"
        const user = await User.findOne({
            _id: userId,
            accountType: "Tutor",
        }).select("firstName lastName image email additionalDetails courses").populate("additionalDetails courses");

        if (!user) {
            return res.status(404).json({ message: "Tutor profile not found" });
        }

        res.status(200).json({
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            image: user.image,
            additionalDetails: user.additionalDetails,
            courses: user.courses,
        });
    } catch (error) {
        console.error("Error fetching tutor profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Controller to update tutor's profile details
const updateTutorProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming req.user is set after authentication

        const user = await User.findOne({ _id: userId, accountType: "Tutor" });
        if (!user) {
            return res.status(404).json({ message: "Tutor profile not found" });
        }

        const { firstName, lastName, image, additionalDetails } = req.body;

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (image) user.image = image;
        if (additionalDetails) user.additionalDetails = additionalDetails;

        await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            profile: {
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                image: user.image,
                additionalDetails: user.additionalDetails,
            },
        });
    } catch (error) {
        console.error("Error updating tutor profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Controller to change password for tutor
const changePassword = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming req.user is set after authentication

        const user = await User.findOne({ _id: userId, accountType: "Tutor" });
        if (!user) {
            return res.status(404).json({ message: "Tutor profile not found" });
        }

        const { currentPassword, newPassword, confirmPassword } = req.body;

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "New passwords do not match" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error changing tutor password:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { getTutorProfile, updateTutorProfile, changePassword };
