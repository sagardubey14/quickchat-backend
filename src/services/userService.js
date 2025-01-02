const Users = require('../models/userModel');

const registerUser = (user) => {
    Users.push(user);
};

const getGroupID = (username)=>{
    return Users.find(user=>user.username === username).group;
}

const registerUserToGroup = (grpId, members)=>{
    members.forEach((username) => {
        const user = Users.find(user => user.username === username)
        user.group.push(grpId)
    });
}
const loginUser = (email, pass) => {
    return Users.find(user => user.email === email && user.pass === pass);
};

const getUsersByUsername = (username) => {
    return Users.filter(user => user.username.startsWith(username)).map(user=> user.username);
};

module.exports = { registerUser, loginUser, getUsersByUsername, registerUserToGroup, getGroupID };
