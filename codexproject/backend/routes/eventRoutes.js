const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Event = require("../models/Event");

const router = express.Router();

// Create event
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const event = new Event({ title, description, date });
    await event.save();
    res.status(201).json({ message: "Event created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating event" });
  }
});

// Register for an event
router.post("/register/:eventId", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (!event.attendees.includes(req.user.id)) {
      event.attendees.push(req.user.id);
      await event.save();
    }

    res.json({ message: "Successfully registered for the event" });
  } catch (error) {
    res.status(500).json({ message: "Error registering for event" });
  }
});

// Get all events
router.get("/list", async (req, res) => {
  try {
    const events = await Event.find().populate("attendees", "name email");
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events" });
  }
});

module.exports = router;
