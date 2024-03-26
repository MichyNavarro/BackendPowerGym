const express = require('express');
const { authRequired } = require('../middlewares/validateToken.js');
const {
	createTurno,
	getTurnos,
	getTurno,
	deleteTurno
} = require('../controllers/turno.controller.js');

const router = express.Router();

router.get('/turnos', authRequired,  getTurnos);
router.get('/turnos/:id', authRequired, getTurno);
router.post('/turnos', authRequired, createTurno);
router.delete('/turnos/:id', authRequired, deleteTurno);

module.exports = router;
