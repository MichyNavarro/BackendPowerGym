const express = require('express');
const {
    getUsers,
    getUser,
    updateUser,
    createUser,
    loginUser,
    createPago,
} = require('../controllers/user.controller.js');

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.post('/users/register', createUser);
router.post('/users/:id/pagos', createPago);
router.post("/users/login", loginUser);

module.exports = router;
