
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./src/database/db.js');
const registerRoutes = require("./src/routes/users.routes.js");
const loginRoutes = require('./src/routes/users.routes.js');
const turnosRoutes = require('./src/routes/turnos.routes.js');
const usersRoutes = require('./src/routes/users.routes.js');
const clasesRoutes = require('./src/routes/clases.routes.js');
const pagosRoutes = require('./src/routes/pagos.routes.js');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Utiliza las rutas de registro y login
app.use('/api', registerRoutes);
app.use('/api', loginRoutes);
app.use('/api', turnosRoutes);
app.use('/api', usersRoutes);
app.use('/api', clasesRoutes);
app.use('/api', pagosRoutes);

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
