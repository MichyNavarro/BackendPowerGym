const User = require('../model/user.model.js');

const getUsers = async (req, res) => {
	try {
		const users = await User.find().select('-password');
		res.json(users);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		res.json(user);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const createUser = async (req, res) => {
	// Extraer los campos del cuerpo de la solicitud (request body)
	const { nombre, apellido, email, dni, domicilio, celular, password } =
		req.body;
	try {
		const newUser = new User({
			nombre,
			apellido,
			email,
			dni,
			domicilio,
			celular,
			password,
		});
		const savedUser = await newUser.save();
		// envia respuesta del registro al frontend
		res.json({
			id: savedUser._id,
			email: savedUser.email,
			createdAt: savedUser.createdAt,
		});
	} catch (error) {
		return res.status(500).json(['Error de registro de usuario']);
	}
};

const updateUser = async (req, res) => {
	try {
		const { nombre, apellido, email, dni, domicilio, celular, password } =
			req.body;
		const updateFields = {
			nombre,
			apellido,
			email,
			dni,
			domicilio,
			celular,
		};

		// Verificar si el campo password está presente en la solicitud
		if (password) {
			// Si el password está presente, agregarlo al objeto de campos a actualizar
			updateFields.password = password;
		}
		const updateUser = await User.findByIdAndUpdate(
			req.params.id,
			updateFields,
			{
				new: true,
			}
		);
		res.json(updateUser);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getUser,
	getUsers,
	createUser,
	updateUser,
};
