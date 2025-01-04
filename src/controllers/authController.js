const { registerUser, loginUser } = require('../services/userService');
require('dotenv').config();

const register = (req, res) => {
    let {message, status} = registerUser(req.body);
    res.status(status).json({ message});
};

const login = (req, res) => {
    const { email, pass } = req.body;
    const { message, status, username} = loginUser(email, pass);
    res.status(status).json({ message, username});
};

const verify = (req, res)=>{
    const { pass } = req.body;
    
    if(pass === process.env.ADMIN_PASS)
        res.status(200).json({username:`${process.env.ADMIN_USER}`});
    else
        res.status(401).json({message:'NOT ALLOWED'});
}

module.exports = { register, login, verify };
