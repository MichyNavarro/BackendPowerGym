const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema(
	{
		nombre: {
			type: String,
			require: true,
		},
		comentario: {
			type: String,
			require: true,
		},
	},
	{
		timestamps: true,
	}
);
module.exports = mongoose.model('Comentario', comentarioSchema);