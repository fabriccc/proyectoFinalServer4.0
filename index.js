/*var path = require("path"); // Incluyo path en el proyecto
var express = require("express"); // Incluyo express en el proyecto

var app = express(); // Inicializo express
var folder = path.join(__dirname, "public"); // Creo la variable con la carpeta public
app.use(express.static(folder)); // Defino la carpeta public como la base de los archivos del sitio
app.listen(5000); // Levanto el servidor en el puerto 5000*/



//VINCULADO A BASE DE DATOS MONGO


const express = require('express');
const path = require('path');
const app = express();
const upload= require('express-fileupload')
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://DylanPorras:1234@ucenfotec.aok0faj.mongodb.net/Proyecto?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Permite el uso de JSON como parámetros del POST
app.use(upload({
  useTempFiles : true
}));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/usuarios', require('./api/usuarios.js'));
app.use('/logros', require('./api/logros.js'));
app.use('/recetas', require('./api/recetas.js'));
app.use('/ayunos', require('./api/ayunos.js'));
app.use('/ejercicios', require('./api/ejercicios.js'));
app.listen(3000, function() {
  console.log('Servidor corriendo en puerto 3000...')
});
