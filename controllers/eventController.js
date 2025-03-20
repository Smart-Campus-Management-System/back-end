const Event = require('../models/Event');

// API Routes
// Get all events
exports.getAll = async (req, res) => {
    try {
        const events = await Event.find().sort({ start: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get events by role
exports.getByRole = async (req, res) => {
    try {
        const { role } = req.params;
        // For future implementation: could filter events based on role
        const events = await Event.find().sort({ start: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Add new event
exports.addEvent = async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: 'Invalid event data', error: error.message });
    }
};

// Update event
exports.updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedEvent = await Event.findOneAndUpdate(
            { id },
            { ...req.body, updatedAt: Date.now() },
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json(updatedEvent);
    } catch (error) {
        res.status(400).json({ message: 'Update failed', error: error.message });
    }
};

// Delete event
exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEvent = await Event.findOneAndDelete({ id });

        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Delete failed', error: error.message });
    }
};

// Generate Google Meet link
exports.generateGoogleMeet = async (req, res) => {
    try {
        // Mock implementation for generating Meet link
        // In production, this would integrate with Google Calendar API
        const { title } = req.body;
        const meetId = title.replace(/\s+/g, '-').toLowerCase() + '-' + Math.random().toString(36).substring(2, 7);
        const meetLink = `https://meet.google.com/${meetId}`;

        res.json({ meetLink });
    } catch (error) {
        res.status(500).json({ message: 'Failed to generate Meet link', error: error.message });
    }
};
