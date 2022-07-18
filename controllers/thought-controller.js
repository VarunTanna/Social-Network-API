const { Thought, User } = require("../models");

module.exports = {
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({ path: "reactions", select: "-__v"})
        .populate({ path: "thoughts", select: "-__v" })
        .select("-__v")
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                res.status(404).json({ message: " No Thought with this ID!"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    createThought ({ body }, res) {
        Thought.create(body)
        .then((thoughtData) => {
            return User.findOneAndUpdate(
                { _id: body.userId},
                { $push: { thoughts: thoughtData._id }},
                { new: true }
            );
        })
        .then((dbUserData))
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id}. body, { new: true })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought with this id"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.status(400).json(err));
    }, 
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought with this id"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.status(404).json(err));
    },
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body}},
            { new: true}
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "no thought with this id"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((er) => res.json(err));
    },
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId}}},
            { new: true}
        )
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.json(err));
    }


  
}

