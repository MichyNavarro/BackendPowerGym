const Clase = require('../model/clase.model.js');

const getClases = async (req, res) => {
	try {
		const clases = await Clase.find();
		res.json(clases);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const createClase = async (req, res) => {
	// Extraer los campos del cuerpo de la solicitud (request body)
	const { fecha, hora, actividad, sede, disponibilidad } = req.body;
	try {
		// Crear una nueva instancia del modelo Clase utilizando los datos de la solicitud
		const newClase = new Clase({
			fecha,
			hora,
			actividad,
			sede,
			disponibilidad,
		});
		const savedClase = await newClase.save();

		res.json(savedClase);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getClase = async (req, res) => {
	try {
		const claseSeleccionada = await Clase.findById(req.params.id);
		res.json(claseSeleccionada);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const deleteClase = async (req, res) => {
	try {
		const deletedClase = await Clase.findByIdAndDelete(req.params.id);
		res.json(deletedClase);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updateDisponibilidad = async (req, res) => {
	try {
		let { disponibilidad } = req.body;
		const updateFields = {
			disponibilidad,
		};
		const updatedClase = await Clase.findByIdAndUpdate(
			req.params.id,
			updateFields,
			{ new: true }
		);
		res.json(updatedClase);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

//Michel
const updateClase = async (req, res) => {
	try {
		let { fecha, hora, actividad, sede, disponibilidad } = req.body;
		const updateFields = {
			fecha,
			hora,
			actividad,
			disponibilidad,
			sede,
		};
		const updatedClase = await Clase.findByIdAndUpdate(
			req.params.id,
			updateFields,
			{ new: true }
		);
		res.json(updatedClase);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getClase,
	getClases,
	createClase,
	deleteClase,
	updateDisponibilidad,
	updateClase,
};
