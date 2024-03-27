const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./src/database/db.js');
const authRoutes = require('./src/routes/auth.routes.js');
const turnosRoutes = require('./src/routes/turnos.routes.js');
const usersRoutes = require('./src/routes/users.routes.js');
const clasesRoutes = require('./src/routes/clases.routes.js');
const comentariosRoutes = require('./src/routes/comentarios.routes.js');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(
	cors({
		origin: 'http://localhost:5173, , https://backendpowergym.onrender.com',
		credentials: true,
	})
);

app.use(cookieParser());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', turnosRoutes);
app.use('/api', usersRoutes);
app.use('/api', clasesRoutes);
app.use('/api', comentariosRoutes);

async function main() {
	try {
		await connectDB();
		app.listen(port, () => {
			console.log(`Servidor corriendo en http://localhost:${port}`);
		});
	} catch (error) {
		console.error(error);
	}
}

main();
