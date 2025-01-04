const { handleLeaveGroup, getQueueDataToAdmin } = require('../services/messageService');
const { getUsersByUsername, getUserDataToAdmin } = require('../services/userService');

const getUsers = (req, res) => {
    const { username } = req.query;
    const foundUsers = getUsersByUsername(username);
    if (foundUsers.length === 0) {
        res.send({ msg: 'No User found' });
    } else {
        res.send({ foundUsers });
    }
};

const getDataToAdmin = (req, res)=>{
    let key = req.query.which;
    let result;
    switch (key) {
        case 'users':
            result = getUserDataToAdmin();
            break;
        case 'queue':
            result = getQueueDataToAdmin(key);
            break;
        case 'group':
            result = getQueueDataToAdmin(key);
            break;
        case 'all':
            let User = getUserDataToAdmin();
            let queue = getQueueDataToAdmin(key)
            result = {...queue, User}
            break;
    }
    
    res.send({ result});
}

const leaveGroup = (req, res)=>{
    handleLeaveGroup(req, res);
};

module.exports = { getUsers, leaveGroup, getDataToAdmin};
