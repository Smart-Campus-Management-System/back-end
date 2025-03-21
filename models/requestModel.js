const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Student is required']
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, 'Course is required']
    },
    time: {
        type: Date,
        required: [true, 'Time is required']
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Declined'],
        default: 'Pending'
    },
    zoomLink: {
        type: String,
        default: ''
    },
    notes: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ClassRequest = mongoose.model('ClassRequest', requestSchema);

module.exports = ClassRequest;
