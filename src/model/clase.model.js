const mongoose = require('mongoose');

const claseSchema = new mongoose.Schema(
	{
		fecha: {
			type: String,
			require: true,
		},
		hora: {
			type: String,
			require: true,
		},
		actividad: {
			type: String,
			require: true,
		},
		disponibilidad: {
			type: Number,
			require: true,
		},
		sede: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);
module.exports = mongoose.model('Clase', claseSchema);
