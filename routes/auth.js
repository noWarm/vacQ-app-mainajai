// import dependencies
const express = require('express');

// import the methods handler from the controller
const {register, login} = require('../controllers/auth');

const router = express.Router();

// link the API endpoints to each method of the controller
router.post('/register', register);
router.post('/login', login);

// export the router
module.exports = router;