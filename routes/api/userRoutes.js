const router = require("express").Router();
const { User } = require("../../models");

// GET all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find().populate("thoughts friends");
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single user by ID
router.get("/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate("thoughts friends");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Creates a new user
router.post("/", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Updates a user
router.put("/:userId", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a user
router.delete("/:userId", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Adds a friend
router.post("/:userId/friends/:friendId", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        ).populate("friends");

        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Removes a friend
router.delete("/:userId/friends/:friendId", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $pull: { friends: req.params.friendId } },
            { new: true }
        ).populate("friends");

        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
