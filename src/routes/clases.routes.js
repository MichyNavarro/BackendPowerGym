const express = require('express');
const { authRequired } = require('../middlewares/validateToken.js');
const {
	createClase,
	getClases,
	getClase,
	deleteClase,
	updateDisponibilidad,
	updateClase
} = require('../controllers/clase.controller.js');

const router = express.Router();

router.get('/clases', authRequired,  getClases);
router.get('/clases/:id', authRequired,  getClase);
router.post('/clases', authRequired, createClase);
router.delete('/clases', authRequired,  deleteClase);
router.put('/clases/:id', authRequired,  updateDisponibilidad);
router.put('/clases/update/:id', authRequired, updateClase);

module.exports = router;
