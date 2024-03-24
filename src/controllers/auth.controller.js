const User = require('../model/user.model.js');
const bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');
// const { TOKEN_SECRET } = require('../app.js');

const createUser = async (req, res) => {
	// Extraer los campos del cuerpo de la solicitud (request body)
	const { nombre, apellido, email, dni, domicilio, celular, password } =
		req.body;
	try {
		const saltRounds = 10; // Definir el número de salt rounds
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		// Verificar si ya existe un usuario con el mismo correo electrónico
		const existingUser = await User.findOne({ email: email });
		if (existingUser) {
			// Si ya existe un usuario con ese correo electrónico, devuelve un mensaje de error
			return res
				.status(400)
				.json({ message: 'El correo electrónico ya está en uso' });
		}

		// Si no existe ningún usuario con ese correo electrónico, procede a guardar el nuevo usuario
		const newUser = new User({
			nombre,
			apellido,
			email,
			dni,
			domicilio,
			celular,
			password: hashedPassword,
		});
		const savedUser = await newUser.save();

		// envia respuesta del registro al frontend
		res.status(201).json({
			message: 'Usuario registrado correctamente',
			user: savedUser,
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error al registrar usuario',
			error: error.message,
		});
	}
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		// Buscar al usuario por correo electrónico en la base de datos
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: 'Usuario no encontrado' });
		}

		// Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: 'Credenciales inválidas' });
		}

		// Generar un token de autenticación
		const token = Jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET);
		res.cookie('accesstoken', token);
		// Devolver el token al cliente
		res.json({
			id: user._id,
			email: user.email,
			displayName: `${user.nombre} ${user.apellido}`,
			token: token,
		});
	} catch (error) {
		console.error('Error al iniciar sesión:', error);
		res.status(500).json({
			message: 'Error al iniciar sesión',
			error: error.message,
		});
	}
};

const logout = (req, res) => {
	res.cookie('token', '', { expires: new Date(0) });
	return res.sendStatus(200);
};

const verifyToken = async (req, res) => {
	const token = req.cookies.token;
	console.log(token);
	if (!token) return res.send(false);

	Jwt.verify(token, process.env.TOKEN_SECRET, async (error, user) => {
		if (error) return res.status(401).json(['No autorizado']);

		const userFound = await User.findById(user.id);
		console.log(userFound);
		if (!userFound) return res.status(401).json(['No autorizado']);

		return res.json({
			id: userFound._id,
			email: userFound.email,
			displayName: `${userFound.nombre} ${userFound.apellido}`,
			token: token,
		});
	});
};

module.exports = {
	createUser,
	loginUser,
	logout,
	verifyToken,
};