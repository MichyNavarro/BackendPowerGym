const Usuario = require('../model/user.model');

const cargarUsuarios = async (req, res) => {
	try {
		const usuarios = await Usuario.find();

		res.status(200).json({
			ok: true,
			usuarios,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Contacte al administrador del sitio web',
		});
	}
};

const eliminarUsuario = async (req, res) => {
	try {
		const usuarioEliminar = await Usuario.findById(req.params.id);

		if (!usuarioEliminar) {
			return res.status(404).json({
				ok: false,
				msg: 'No existe un usuario con este ID',
			});
		}

		await Usuario.findByIdAndDelete(req.params.id);

		res.status(200).json({
			ok: true,
			msg: 'Usuario eliminado',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Contacte al administrador del sitio web',
		});
	}
};

module.exports = {
	cargarUsuarios,
	eliminarUsuario,
};
