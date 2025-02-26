
const router = require('express').Router();
const { Thought } = require('../../models');

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/")
  .get(getAllThoughts) // Get all thoughts
  .post(createThought); // Create a new thought

// /api/thoughts/:thoughtId
router.route("/:thoughtId")
  .get(getThoughtById) // Get a single thought by ID
  .put(updateThought) // Update a thought
  .delete(deleteThought); // Delete a thought

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions")
  .post(addReaction); // Add a reaction to a thought

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId")
  .delete(removeReaction); // Remove a reaction from a thought

module.exports = router;
