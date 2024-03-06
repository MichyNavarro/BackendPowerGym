const Pago = require('../model/pago.model.js');

const getPagos = async (req, res) => {
	try {
		const pagos = await Pago.find();
		res.json(pagos);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const createPago = async (req, res) => {
	// Extraer los campos del cuerpo de la solicitud (request body)
	const { fechavenc, plan, estado, fechapago, idUser } = req.body;

	try {
		// Crear una nueva instancia del modelo Clase utilizando los datos de la solicitud
		const newPago = new Pago({
			fechavenc,
			plan,
			estado,
			fechapago,
			idUser
		});
		const savedPago = await newPago.save();
		res.json(savedPago);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getPago = async (req, res) => {
	try {
		const pago = await Pago.findById(req.params.id);
		if (!res) return res.status(404).json({ message: 'Pago no encontrado' });
		res.json(pago);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const deletePago = async (req, res) => {
	try {
		const deletedPago = await Pago.findByIdAndDelete(req.params.id);
		if (!deletedPago)
			return res.status(404).json({ message: 'Pago no encontrado' });

		res.json(deletedPago);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getPago,
	getPagos,
	createPago,
	deletePago,
};
