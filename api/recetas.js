const express = require('express');
const router = express.Router();
const Receta = require('../schemas/receta.js');
const uploadImage = require('../utils/cloudinary.js');
const mongoose = require('mongoose');


router.get('/', async function (req, res) {
    const recetas = await Receta.find().exec();
    return res.json(recetas);
});
  router.get('/:correo', async function (req, res) {
    const { correo } = req.params;
    const receta = await Receta.findOne({ correo });
    if (!receta) return res.json({ mensaje: 'Receta no encontrada en la base de datos.'});
    return res.json(receta);
  })
  router.put("/modificar", async (req, res) => {
    const receta = req.body
    console.log(req.files);
    try {
      if(req.files?.foto_receta) {
        const resultado = await uploadImage(req.files.foto_receta.tempFilePath);
        receta.foto_receta = {
          public_id: resultado.public_id,
          secure_url: resultado.secure_url
        }
      }
      const recetaActual= await Receta.findOneAndUpdate(
        { correo: receta.correo },
        receta,
        { new: true }
      )
      return res.json(recetaActual);
    } catch (error) {
      console.error(error);
      return res.json({ mensaje: 'Error al tratar de actualizar la receta'});
    }
  });
  router.get('/buscar-por/:correo', async (req, res) => {
    const { correo } = req.params;
    const mensajeError = `Receta${correo ? ' con correo ' + correo : ''} no encontrado en la base de datos`
    try {
      const receta = await obtenerRecetaPorCorreo(correo);
      if (!receta) return res.json({ mensaje: mensajeError });
      return res.json(receta);
    } catch (error) {
      console.error(error);
      return res.json({ mensaje: mensajeError })
    }
  })
  const obtenerRecetaPorCorreo = async (correo) => {
    try {
      const receta = await Receta.findOne({ correo });
      if (!receta) return null;
      return receta;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  router.post('/insertar', async function (req, res) {
    var recetaNueva = new Receta({
      _id: new mongoose.Types.ObjectId(),
      nombre: req.body.nombre,
      ingredientes: req.body.ingredientes,
      pasos: req.body.pasos,
      horaComida: req.body.horaComida,
      tipoComida: req.body.tipoComida
    });
    
    
    if(req.files?.foto_receta) {
      const resultado= await uploadImage(req.files.foto_receta.tempFilePath)
        console.log(resultado)
        recetaNueva.foto_receta = {
          public_id: resultado.public_id,
          secure_url: resultado.secure_url
        }
    }
    console.log(recetaNueva)
    const receta= await recetaNueva.save()
    res.json(receta)
     
  });

   module.exports = router;