var mongoose = require('mongoose'); //Se llama la libreria Mongoose

var recetaSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  correo: String,
  foto_receta: { public_id: String, secure_url: String},
  nombre: String,
  ingredientes: String,
  pasos: String,
  horaComida: String,
  tipoComida: String
});

module.exports = mongoose.model('Receta', recetaSchema, 'Recetas');