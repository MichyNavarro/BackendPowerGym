const express = require('express');
// const { authRequired } = require('../middlewares/validateToken.js');
const {
	createClase,
	getClases,
	getClase,
	deleteClase,
	updateDisponibilidad,
	updateClase
} = require('../controllers/clase.controller.js');

const router = express.Router();

router.get('/clases',  getClases);
router.get('/clases/:id',  getClase);
router.post('/clases',  createClase);
router.delete('/clases',  deleteClase);
router.put('/clases/:id',  updateDisponibilidad);
router.put('/clases/update/:id',  updateClase);

module.exports = router;
