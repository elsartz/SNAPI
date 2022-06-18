const User = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.id})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'User not found' });
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));

    },
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params._id }, body, {new: true, runValidators: true})
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));

    },
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    createFriend() {},
    deleteFriend() {}
}

module.exports = userController;