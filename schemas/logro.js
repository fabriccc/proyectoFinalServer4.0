var mongoose = require('mongoose'); //Se llama la libreria Mongoose

var logroSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombre: String
});

module.exports = mongoose.model('Logro', logroSchema, 'Logros');
