const express = require('express');
const { getUsers, leaveGroup, getDataToAdmin } = require('../controllers/userController');
const router = express.Router();

router.get('/users', getUsers);
router.delete('/groups/:groupName/users/:username', leaveGroup);
router.get('/data', getDataToAdmin);

module.exports = router;
