const express = require('express');
const router = express.Router();
const Ejercicio = require('../schemas/ejercicio.js');
const mongoose = require('mongoose');

router.get('/', async function (req, res) {
  const ejercicios = await Ejercicio.find().exec();
  return res.json(ejercicios);
});


router.post('/insertar', async function (req, res) {
  var ejercicioNueva = new Ejercicio({
    _id: new mongoose.Types.ObjectId(),
    nombre: req.body.nombre,
    inicio: req.body.inicio,
    fin: req.body.fin,
    tipo: req.body.tipo,
    fecha: req.body.fecha
  });
  
  
  console.log(ejercicioNueva)
  const ejercicio= await ejercicioNueva.save()
  res.json(ejercicio)
   
});

 module.exports = router;