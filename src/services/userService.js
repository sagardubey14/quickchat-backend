const Users = require('../models/userModel');

const registerUser = (user) => {
    Users.push(user);
};

const loginUser = (email, pass) => {
    return Users.find(user => user.email === email && user.pass === pass);
};

const getUsersByUsername = (username) => {
    return Users.filter(user => user.username.startsWith(username));
};

module.exports = { registerUser, loginUser, getUsersByUsername };
