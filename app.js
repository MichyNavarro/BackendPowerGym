//importamos express
const express = require('express');
const app = express();
require("dotenv").config();



//lecutura y parseo del body
app.use(express.json());

app.listen(process.env.PORT, () => {
	console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
