const User = require('../model/user.model.js');
const bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');
const createAccessToken = require('../libs/jwt.js');

const createUser = async (req, res) => {
	const { nombre, apellido, email, dni, domicilio, celular, password } =
		req.body;
	try {
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		// Verificar si ya existe un usuario con el mismo correo electrónico
		const existingUser = await User.findOne({ email: email });
		if (existingUser) {
			// Si ya existe un usuario con ese correo electrónico, devuelve un mensaje de error
			return res
				.status(400)
				.json({ message: 'El correo electrónico ya está registrado' });
		}
		const displayName= `${nombre} ${apellido}`
		// Si no existe ningún usuario con ese correo electrónico, procede a guardar el nuevo usuario
		const newUser = new User({
			nombre,
			apellido,
			email,
			dni,
			domicilio,
			celular,
			password: hashedPassword,
			displayName: displayName,
		});
		const savedUser = await newUser.save();

		const payload = {
			id: savedUser._id,
			nombre: savedUser.nombre,
			apellido: savedUser.apellido,
			email: savedUser.email,
		};

		const token = Jwt.sign(payload, process.env.TOKEN_SECRET, {
			expiresIn: '1d',
		});
		console.log(token)

		res.status(201).json({
			id: savedUser._id,
			email: savedUser.email,
			displayName: savedUser.displayName,
			token: token,
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error al registrar usuario',
			error: error.message,
		});
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		// Buscar al usuario por correo electrónico en la base de datos
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: 'Usuario no encontrado' });
		}

		// Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res
				.status(401)
				.json({ message: 'La contraseña ingresada es incorrecta' });
		}

		// Generar un token de autenticación
				const payload = {
			id: user._id,
			nombre: user.nombre,
			apellido: user.apellido,
			email: user.email,
		};

		const token = Jwt.sign(payload, process.env.TOKEN_SECRET, {
			expiresIn: '1d',
		});
		console.log(token)
		// Devolver el token al cliente
		res.status(200).json({
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
