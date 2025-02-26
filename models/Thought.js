const { Schema, model, Types } = require('mongoose');

// Reaction Schema
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => new Date(timestamp).toLocaleString()
    }
}, {
    toJSON: { getters: true },
    id: false
});

// Thought Schema
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => new Date(timestamp).toLocaleString()
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
}, {
    toJSON: { virtuals: true, getters: true },
    id: false
});

// Virtual field for reaction count
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Static method to add thought to the user
thoughtSchema.statics.addThoughtToUser = async function (thoughtId, username) {
    try {
        // Find the user and add the thought to their thoughts array
        const user = await User.findOneAndUpdate(
            { username },
            { $push: { thoughts: thoughtId } },
            { new: true }
        );
        //not found
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (err) {
        throw new Error('Error adding thought to user');
    }
};

// Create the Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
