const express = require('express');

const turnosRoutes = require('./src/routes/turnos.routes.js');
const usersRoutes = require('./src/routes/users.routes.js');
const clasesRoutes = require('./src/routes/clases.routes.js');
const pagosRoutes = require('./src/routes/pagos.routes.js');
const adminRoutes = require('./src/routes/adminRouter.js');

const connectDB = require('./src/database/db.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

app.use(cookieParser());
app.use(
	cors({
		origin: [
			'http://localhost:5173',
			'https://flourishing-tanuki-55bdc2.netlify.app',
			'http://localhost:5174',
			'*',
		],
		credentials: true,
	})
);

app.use(express.json());

app.use('/api', turnosRoutes);
app.use('/api', usersRoutes);
app.use('/api', clasesRoutes);
app.use('/api', pagosRoutes);
app.use('/api', adminRoutes);

async function main() {
	try {
		await connectDB();
		console.log(`Escuchando en el puerto:`, 4000);
		app.listen(4000);
	} catch (error) {
		console.error(error);
	}
}

main();
