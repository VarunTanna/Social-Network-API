const { User, Thought } = require("../models");

module.exports = {
    getThought(req, res) {
        Thought.find({})
        .then((Thought) => res)
    }
}