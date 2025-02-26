const { Thought } = require('../models');
const User = require('../models/User'); // Ensure User model is required

// Gets all thoughts
const getAllThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Gets a single thought by ID
const getThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) return res.status(404).json({ message: 'Thought not found, try again :)' });
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Creates a new thought and adds it to the user's thoughts
const createThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body);

        const user = await User.findOneAndUpdate(
            { username: req.body.username },
            { $push: { thoughts: thought._id } }, // Push the thought ID into the user's thoughts array
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found, unable to add thought.' });
        }

        // Send response with the created thought and updated user
        res.status(201).json({ message: 'Thought created and added to user', thought, user });
    } catch (err) {
        res.status(400).json(err);
    }
};

// Updates a thought
const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
        if (!thought) return res.status(404).json({ message: 'Thought not found, try again :)' });
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Deletes a thought
const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
        if (!thought) return res.status(404).json({ message: 'Thought not found, try again :)' });
        res.json({ message: 'Thought deleted' });
    } catch (err) {
        res.status(500).json(err);
    }
};

// Adds a reaction to a thought
const addReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions: req.body } },
            { new: true }
        );
        if (!thought) return res.status(404).json({ message: 'Thought not found, try again :)' });
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Removes a reaction from a thought
const removeReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );
        if (!thought) return res.status(404).json({ message: 'Thought not found, try again :)' });
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Export all functions
module.exports = {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
};
