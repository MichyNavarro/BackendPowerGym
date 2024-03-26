const express = require('express');

const {
	createUser,
	loginUser,
	logout,
	verifyToken,
} = require('../controllers/auth.controller.js');

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/verify', verifyToken);
router.post('/logout', logout);

module.exports = router;
