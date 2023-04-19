import express from 'express';
import dotenv from 'dotenv';
import conectarDb from './config/db.js';

import usuarioRoutes from './routes/usuarioRoutes.js';
import categoriaRoutes from './routes/categoriaRoutes.js';
import noticiaRoutes from './routes/noticiaRoutes.js';
import universidadRoutes from './routes/universidadRoutes.js';
import equipoRoutes from './routes/equipoRoutes.js';

const app = express();
app.use(express.json()); //Esto habilita el poder leer archivos json en postman

dotenv.config(); //Me aceptara las variables de entorno

conectarDb(); // Funcion para dar inicio a la database

//Routing
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/categoria', categoriaRoutes);
app.use('/api/noticias', noticiaRoutes);
app.use('/api/universidad', universidadRoutes);
app.use('/api/equipo', equipoRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
