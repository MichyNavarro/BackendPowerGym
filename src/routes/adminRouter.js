const express = require('express');

const {
	cargarUsuarios,
    eliminarUsuario,
} = require('../controllers/adminControllers');

 const routerAdmin = express.Router();

// validar token
// const { validarJWT } = require('../middlewares/validar-jwt');

routerAdmin.get('/users', cargarUsuarios); //Agregar funcion JWT en medio

routerAdmin.delete('/users/:id', eliminarUsuario); //Agregar funcion JWT en medio


module.exports = routerAdmin;
