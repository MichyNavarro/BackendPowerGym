const Comentario = require('../model/comentarios.model.js');

const getComentarios = async (req, res) => {
	try {
		const comentarios = await Comentario.find();
		// Selecciona aleatoriamente 5 comentarios de la lista
		const comentariosAleatorios = shuffleArray(comentarios).slice(0, 5);

		res.json(comentariosAleatorios);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
// Función para mezclar los comentarios
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

const createComentario = async (req, res) => {
	const { nombre, comentario } = req.body;

	try {
		const newComentario = new Comentario({
			nombre,
			comentario,
		});
		const savedComentario = await newComentario.save();

		res.json(savedComentario);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getComentarios,
	createComentario,
};
