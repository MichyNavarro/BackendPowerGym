const mongoose = require('mongoose');

const turnoSchema = new mongoose.Schema(
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
		idUser: {
			type: String,
			require: true,
		},
		idClase:{
			type:String
		}
	},
	{
		timestamps: true,
	}
);
module.exports = mongoose.model('Turno', turnoSchema);
