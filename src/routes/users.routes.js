const express = require('express');
const { authRequired } = require('../middlewares/validateToken.js');
const {
    getUsers,
    getUser,
    updateUser,
    createPago,
    deleteUser
} = require('../controllers/user.controller.js');

const router = express.Router();

router.get('/users', authRequired, getUsers);
router.get('/users/:id', authRequired, getUser);
router.put('/users/:id', authRequired,  updateUser);
router.post('/users/:id/pagos', authRequired, createPago);
router.delete('/users/:id', authRequired,  deleteUser);

module.exports = router;
