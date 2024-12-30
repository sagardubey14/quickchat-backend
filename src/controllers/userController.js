const { getUsersByUsername } = require('../services/userService');

const getUsers = (req, res) => {
    const { username } = req.query;
    const foundUsers = getUsersByUsername(username);
    if (foundUsers.length === 0) {
        res.send({ msg: 'No User found' });
    } else {
        res.send({ foundUsers });
    }
};

module.exports = { getUsers };
