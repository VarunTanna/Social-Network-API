const { User } = require('../models');


module.exports  = {
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: "thoughts",
            select: "-__v",
        })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate('thoughts')
        .populate('friends')
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: "No User found with this id!"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    updateUser({ params, body}, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: "No User found with this id!"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id})
        .then(dbUserData => {
            if(!dbUserData) {
                return res.status(404).json({ message: "No User found with this id!"});
            }
        })
        .then(() => {
            res.json({ message: "User has been deleted!"});
        })
        .catch(err => res.status(400).json(err));
    },
    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id}, { $addToSet: { friends: params.friendsId}}, { runValidators: true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No User found with this id!"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    removeFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id}, { $pull: { friends: params.friendsId}}, { runValidators: true })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(400).json({ message: " No User found with this id!"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }
}


