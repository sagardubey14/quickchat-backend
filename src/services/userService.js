const Users = require('../models/userModel');

const registerUser = (user) => {
    Users.push(user);
};

const loginUser = (email, pass) => {
    return Users.find(user => user.email === email && user.pass === pass);
};

const getUsersByUsername = (username) => {
    return Users.filter(user => user.username.startsWith(username)).map(user=> user.username);
};

const setLastSeen = (username)=>{
    let user = Users.find(user => user.username === username);
    user.lastOnline = new Date().toISOString();
    console.log(`Updated lastOnline for ${username}: ${user.lastOnline}`);
}

const getLastSeen = (username)=>{

    return Users.find(user => user.username === username).lastOnline;
}

module.exports = { registerUser, loginUser, getUsersByUsername, setLastSeen, getLastSeen };
