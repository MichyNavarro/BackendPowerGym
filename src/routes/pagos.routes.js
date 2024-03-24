const express = require('express');
// const { authRequired } = require('../middlewares/validateToken.js');
const {
	createPago,
	getPagos,
	getPago,
	deletePago,
} = require('../controllers/pago.controller.js');

const router = express.Router();

router.get('/pagos',  getPagos);
router.get('/pagos/:id',  getPago);
router.post('/pagos',  createPago);
router.delete('/pagos',  deletePago);

module.exports = router;
