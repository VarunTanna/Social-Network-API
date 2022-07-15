const router = require('express').Router();

const {
    getAllUsers,
    GetUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend, 
    removeFriend,
} = require("../../controllers/user-controller");

router
.route("/")
.get(getAllUsers)
.post(createUser);

router
.route("/:id")
.get(GetUserById)
.put(updateUser)
.delete(deleteUser);

router
.route("/:id/friends/:friendsId")
.post(addFriend)
.delete(removeFriend);

module.exports = router;