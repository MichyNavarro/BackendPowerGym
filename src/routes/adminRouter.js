const express = require('express');

const {
	cargarUsuarios,
    eliminarUsuario,
} = require('../controllers/adminControllers');

 const routerAdmin = express.Router();

// validar token
// const { validarJWT } = require('../middlewares/validar-jwt');

routerAdmin.get('/users', validarJWT, cargarUsuarios);

routerAdmin.delete('/users/:id', validarJWT, eliminarUsuario);


module.exports = routerAdmin;
