
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./src/database/db.js');
const authRoutes = require('./src/routes/auth.routes.js');
const turnosRoutes = require('./src/routes/turnos.routes.js');
const usersRoutes = require('./src/routes/users.routes.js');
const clasesRoutes = require('./src/routes/clases.routes.js');
<<<<<<< HEAD
const pagosRoutes = require('./src/routes/pagos.routes.js');
const adminRoutes = require('./src/routes/adminRouter.js');
=======
const comentariosRoutes = require('./src/routes/comentarios.routes.js');
>>>>>>> be259d238148b514b87e0099c21eb8306ed61d6c

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true 
  }));

app.use(cookieParser());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', turnosRoutes);
app.use('/api', usersRoutes);
app.use('/api', clasesRoutes);
<<<<<<< HEAD
app.use('/api', pagosRoutes);
app.use('/api', adminRoutes);
=======
app.use('/api', comentariosRoutes);
>>>>>>> be259d238148b514b87e0099c21eb8306ed61d6c

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
