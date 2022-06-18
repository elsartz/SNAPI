const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err));    
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'Thought not found' });
                }
                res.json(dbThoughtData);
            })
    },
    createThought({ body }, res) {
        Thought.create(body)
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err))
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params._id }, body, {new: true, runValidators: true})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'Thought not found' });
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));},
    createReaction() {},
    deleteReaction() {}
}

module.exports = thoughtController;