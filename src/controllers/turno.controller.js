const Turno = require('../model/turno.model.js');

const getTurnos = async (req, res) => {
	try {
		const turnos = await Turno.find();
		res.json(turnos);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const createTurno = async (req, res) => {
	// Extraer los campos del cuerpo de la solicitud (request body)
	const { turnoSeleccionado, user } = req.body;
	const { fecha, hora, actividad, _id } = turnoSeleccionado;
	const idClase = _id;
	try {
		// Crear una nueva instancia del modelo Turno utilizando los datos de la solicitud
		const newTurno = new Turno({
			fecha,
			hora,
			actividad,
			idUser: user,
			idClase: idClase,
		});
		const savedTurno = await newTurno.save();

		res.json(savedTurno);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getTurno = async (req, res) => {
	try {
		const turno = await Turno.findById(req.params.id);
		if (!turno)
			return res.status(404).json({ message: 'Turno no encontrado' });
		res.json(turno);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const deleteTurno = async (req, res) => {
	try {
		const deletedTurno = await Turno.findByIdAndDelete(req.params.id);
		if (!deletedTurno)
			return res.status(404).json({ message: 'Turno no encontrado' });

		res.json(deletedTurno);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getTurno,
	getTurnos,
	createTurno,
	deleteTurno,
};
