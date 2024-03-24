const express = require('express');
const {
	createComentario,
	getComentarios,
} = require('../controllers/comentariosController.js');

const router = express.Router();

router.get('/comentarios', getComentarios);
router.post('/comentarios', createComentario);

module.exports = router;
