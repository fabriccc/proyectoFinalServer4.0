var mongoose = require('mongoose'); //Se llama la libreria Mongoose

var ejercicioSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombre: String,
  tipo: String,
  inicio: String,
  fin: String,
  fecha: Date

});

module.exports = mongoose.model('Ejercicio', ejercicioSchema, 'Ejercicios');