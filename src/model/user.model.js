const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		nombre: {
			type: String,
			required: true,

		},
		email: {
			type: String,
			required: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
		},
		apellido: {
			type: String,
		},
		dni: {
			type: String,

		},
		domicilio: {
			type: String,

		},
		celular: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);
module.exports = mongoose.model('User', userSchema);
