const { registerUser, loginUser } = require('../services/userService');

const register = (req, res) => {
    registerUser(req.body);
    res.send({ message: 'User has registered successfully!' });
};

const login = (req, res) => {
    const { email, pass } = req.body;
    const user = loginUser(email, pass);
    res.send({ username: user.username });
};

module.exports = { register, login };
