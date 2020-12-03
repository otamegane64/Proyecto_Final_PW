const express = require('express');
const rutas = express.Router();

//Importando el controlador de generos
const generosController = require('../controllers/generosController');

//Rutas
rutas.get('/genero',generosController.listadoGeneros);
rutas.get('/genero/:id',generosController.obtenerUnGenero);
rutas.post('/genero',generosController.crearGenero);
rutas.delete('/genero/:id',generosController.eliminarGenero);

module.exports = rutas;