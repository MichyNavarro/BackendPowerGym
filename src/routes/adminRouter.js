const express = require('express');
const { authRequired } = require('../middlewares/validateToken.js');

const {
	cargarUsuarios,
    eliminarUsuario,
} = require('../controllers/adminControllers');

 const routerAdmin = express.Router();


routerAdmin.get('/users', authRequired, cargarUsuarios); 

routerAdmin.delete('/users/:id', authRequired, eliminarUsuario); 


module.exports = routerAdmin;
