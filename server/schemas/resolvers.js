const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        getAllUsers: async () => {
            return User.find();
        },
        me: async (parent, args, context) => {
            const foundUser = await User.findById(context.user._id);

            if (!foundUser) {
                throw new AuthenticationError('Cannot find a user with this id!');
            }

            return foundUser;
        }
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            return User.create({ username, email, password });
        },
        loginUser: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError("Can't find this user");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Wrong password!');
            }
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { book }, context) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: book } },
                { new: true, runValidators: true }
            );

            return updatedUser;
        }
    }
};

module.exports = resolvers;
