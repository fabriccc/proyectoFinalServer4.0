const express = require('express');
const router = express.Router();
const Ayuno = require('../schemas/ayuno.js');
const mongoose = require('mongoose');

router.get('/', async function (req, res) {
  const ayunos = await Ayuno.find().exec();
  return res.json(ayunos);
});


router.post('/insertar', async function (req, res) {
  var ayunoNueva = new Ayuno({
    _id: new mongoose.Types.ObjectId(),
    tipo: req.body.tipo,
    inicio: req.body.inicio,
    fin: req.body.fin,
    fecha: req.body.fecha
  });
  
  
  console.log(ayunoNueva)
  const ayuno= await ayunoNueva.save()
  res.json(ayuno)
   
});

 module.exports = router;