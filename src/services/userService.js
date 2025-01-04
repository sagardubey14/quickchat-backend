const Users = require('../models/userModel');

const registerUser = (user) => {
    if(Users.find(u => u.username === user.username)){
        return { message: "Username already exists", status: 401 };
    }
    if(Users.find(u => u.email === user.email)){
        return { message: "Email already exists", status: 402 };
    }
    Users.push(user);
    return { message: "User has registered successfully!", status: 201 };
};

const loginUser = (email, pass) => {
    let user = Users.find(user => user.email === email);
    if(!user){
        return { message: "Email do not exists", status: 404 };
    }
    if(user.pass !== pass){
        return { message: "Incorrect password", status: 401 };
    }
    return { message: "Login successful", status: 200, username:user.username };
};

const getUserDataToAdmin =()=>{
    return {Users};
}

const getUsersByUsername = (username) => {
    return Users.filter(user => user.username.startsWith(username)).map(user=> user.username);
};

const setLastSeen = (username)=>{
    let user = Users.find(user => user.username === username);
    user.lastOnline = new Date().toISOString();
}

const getLastSeen = (username)=>{
    let seen = Users.find(user => user.username === username)
    console.log(username,seen.lastOnline , 'get Last seen');
    return seen.lastOnline?seen.lastOnline:new Date().toISOString();
}

module.exports = { registerUser, loginUser, getUsersByUsername, setLastSeen, getLastSeen, getUserDataToAdmin };
