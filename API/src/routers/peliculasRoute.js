const express = require('express');
const rutas = express.Router();

const peliculasController = require('../controllers/peliculasController');
rutas.get('/pelicula', peliculasController.listarPeliculas);
rutas.get('/pelicula/:id', peliculasController.obtenerUnaPelicula);
rutas.post('/pelicula',peliculasController.crearPelicula);
rutas.put('/pelicula/:id',peliculasController.editarPelicula);
rutas.delete('/pelicula/:id',peliculasController.eliminarPelicula);
module.exports = rutas;