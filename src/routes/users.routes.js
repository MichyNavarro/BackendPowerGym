const express = require('express');
// const { authRequired } = require('../middlewares/validateToken.js');
const {
	getUsers,
	getUser,
	updateUser,
	createUser,
	createPago,
} = require('../controllers/user.controller.js');

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.post('/users', createUser);
router.post('/users/:id/pagos', createPago);

module.exports = router;
