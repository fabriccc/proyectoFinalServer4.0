var mongoose = require('mongoose'); //Se llama la libreria Mongoose

var ayunoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  tipo: String,
  inicio: String,
  fin: String,
  fecha: Date

});

module.exports = mongoose.model('Ayuno', ayunoSchema, 'Ayunos');