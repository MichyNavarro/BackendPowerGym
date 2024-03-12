const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema(
	{
		fechavenc: {
			type: String,
			require: true,
		},
		plan: {
			type: String,
			require: true,
		},
		fechapago: {
			type: String,
			require: true,
		},
		estado: {
			type: String,
			require: true,
		},
		idUser: {
			type: String,
			require: true,
		},
	},
	{
		timestamps: true,
	}
);
module.exports = mongoose.model('Pago', pagoSchema);
