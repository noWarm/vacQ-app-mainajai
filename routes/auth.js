// all of the paths are prefixed as specified in server
// "/api/v1/auth"

// import dependencies
const express = require('express');

// import the methods handler from the controller
const {register, login, getMe, logout} = require('../controllers/auth');
const { protect } = require('../middleware/auth');

const router = express.Router();

// link the API endpoints to each method of the controller
router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/logout',logout);

// export the router
module.exports = router;