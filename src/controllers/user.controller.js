const axios = require('axios');
const User = require('../model/user.model.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
	const { nombre, apellido, email, dni, domicilio, celular, password } = req.body;
	try {
		const saltRounds = 10; // Definir el número de salt rounds
        const hashedPassword = await bcrypt.hash(password, saltRounds);
		 // Verificar si ya existe un usuario con el mismo correo electrónico
		 const existingUser = await User.findOne({ email: email });
		 if (existingUser) {
			  // Si ya existe un usuario con ese correo electrónico, devuelve un mensaje de error
			  return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
		 }

		 // Si no existe ningún usuario con ese correo electrónico, procede a guardar el nuevo usuario
		 const newUser = new User({
			  nombre,
			  apellido,
			  email,
			  dni,
			  domicilio,
			  celular,
			  password: await bcrypt.hash(password, saltRounds),
		 });
		 const savedUser = await newUser.save();

		 // envia respuesta del registro al frontend
		 res.status(201).json({ message: 'Usuario registrado correctamente', user: savedUser });
	} catch (error) {
		 res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
	}
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
	  console.log('Email recibido:', email);
		 console.log('Contraseña recibida:', password);
		 // Buscar al usuario por correo electrónico en la base de datos
		 const user = await User.findOne({ email });
	  console.log('Usuario encontrado en la base de datos:', user);

		 if (!user) {
		  console.log('¡Usuario no encontrado!');
			  return res.status(404).json({ message: 'Usuario no encontrado' });
		 }

		 // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
		 const isPasswordValid = await bcrypt.compare(password, user.password);
	  console.log('¿La contraseña es válida?', isPasswordValid);

		 if (!isPasswordValid) {
		  console.log('¡Credenciales inválidas!');
			  return res.status(401).json({ message: 'Credenciales inválidas' });
		 }

		 // Generar un token de autenticación
		 const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET);
	  console.log('Token generado:', token);

		 // Devolver el token al cliente
		 res.json({ token });
	} catch (error) {
	  console.error('Error al iniciar sesión:', error);
		 res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
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


module.exports = {
	getUser,
	getUsers,
	createUser,
	loginUser,
	updateUser,
	createPago
};
