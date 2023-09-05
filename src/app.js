const express = require('express');
const morgan = require('morgan');
const config = require('./config');


const usuarios = require('./modulos/usuarios/rutas_usuarios')
const empresas = require('./modulos/empresas/rutas_empresa')
const publicaciones = require('./modulos/publicaciones/rutas_publicaciones')

const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Configuracion
app.set('port', config.app.port)

//Rutas para los usuarios
app.use('/api/usuarios', usuarios);
app.use('/api1/empresas', empresas);
app.use('/api2/publicaciones', publicaciones);

module.exports = app;