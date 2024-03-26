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

const updateUser = async (req, res) => {
	try {
		const { nombre, apellido, email, dni, domicilio, celular, password } =
			req.body;
		const displayName = `${nombre} ${apellido}`;
		const updateFields = {
			nombre,
			apellido,
			email,
			dni,
			domicilio,
			celular,
			displayName: displayName,
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

const createPago = async (req, res) => {
	const { fechavenc, plan, estado, fechapago } = req.body;

	try {
		const userId = req.params.id; // Asegúrate de ajustar esto según tu ruta de API

		// Buscar el expediente por ID
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: 'Usuario no encontrado' });
		}
		// Crear una nueva instancia del modelo pago utilizando los datos de la solicitud
		const newPago = {
			fechavenc,
			estado,
			plan,
			fechapago,
		};
		user.pagos.push(newPago);
		// Guardar el pago actualizado en la base de datos
		const savedPago = await user.save();
		res.json(savedPago.pagos);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
const deleteUser = async (req, res) => {
	try {
		const deletedUser = await User.findByIdAndDelete(req.params.id);
		if (!deletedUser)
			return res.status(404).json({ message: 'Usuario no encontrado' });

		res.json(deletedUser);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getUser,
	getUsers,
	updateUser,
	deleteUser,
	createPago,
};
