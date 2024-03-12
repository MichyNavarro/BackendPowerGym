const express = require('express');
// const { authRequired } = require('../middlewares/validateToken.js');
const {
	createTurno,
	getTurnos,
	getTurno,
	deleteTurno
} = require('../controllers/turno.controller.js');

const router = express.Router();

router.get('/turnos',  getTurnos);
router.get('/turnos/:id',  getTurno);
router.post('/turnos',  createTurno);
router.delete('/turnos/:id',  deleteTurno);

module.exports = router;
