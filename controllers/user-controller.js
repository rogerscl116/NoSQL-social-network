const { User, Thought } = require('../models');

const userController = {
  // get all users
  getAllUsers(req, res) {
      User.find({})
      .populate({
          path: 'thoughts',
          select: ('-__v')
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
          console.log(er);
          res.status(400).json(err);
      });
  },

  // get one user by id
  getUserById({ params }, res) {
      User.findOne({ _id: params.id })
      .populate({
          path: 'thoughts',
          select: '-__v',
      })
      .select('-__v')
      .then(dbUserData => {
          // if no user is found, send 404
          if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
          }
          res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
      },

  // create a user
  createUser({ body }, res) {
      User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
    },

  // update user by id
  updateUser({ params, body }, res) {
      User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
          if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
          }
          res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  // delete user
  deleteUser({ params }, res) {
      User.findByIdAndDelete({ _id: params.id })
      .then(dbUserData => {
          if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
          }
          res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  }
}

module.exports = userController; 