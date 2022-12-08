
const express = require('express');
const router = express.Router();
const Usuario = require('../schemas/usuario.js');
const Logro = require('../schemas/logro.js');

const uploadImage = require('../utils/cloudinary.js');

const ordenarProgresosPorFecha = (progresos) => {
  return progresos?.sort((progresoA, progresoB) => new Date(progresoA.fecha) - new Date(progresoB.fecha)) || [];
}

const obtenerLogrosUsuario = async (logrosUsuario) => {
  const logros = []
  if (logrosUsuario?.length) {
    for (const logroUsuario of logrosUsuario) {
        const { logro: idLogro, realizado, pesoObjetivo } = logroUsuario;
        if (idLogro) {
          const logro = await Logro.findById(idLogro);
          logros.push({
            logro,
            realizado,
            pesoObjetivo
          });
        }
      }
  }
  return logros;
}

const obtenerUsuarioPorCorreo = async (correo) => {
  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) return null;

    usuario.logros = await obtenerLogrosUsuario(usuario?.logros);
    usuario.progresos = ordenarProgresosPorFecha(usuario.progresos);
    return usuario;
  } catch (error) {
    console.error(error);
    return null;
  }
}

router.get('/', async function (req, res) {
    const usuarios =  await Usuario.find();
    usuarios.progresos = ordenarProgresosPorFecha(usuarios.progresos);
    return res.json(usuarios);
});

router.post('/buscar', function(req, res) {
  var idUsuario = req.body.idUsuario;//
  Usuario.findById(idUsuario).exec()
    .then(
      function(result) {
        res.json(result);
      }
    );
});

router.get('/buscar-por/:correo', async (req, res) => {
  const { correo } = req.params;
  const mensajeError = `Usuario${correo ? ' con correo ' + correo : ''} no encontrado en la base de datos`
  try {
    const usuario = await obtenerUsuarioPorCorreo(correo);
    if (!usuario) return res.json({ mensaje: mensajeError });
    return res.json(usuario);
  } catch (error) {
    console.error(error);
    return res.json({ mensaje: mensajeError })
  }
})

router.put("/modificar", async (req, res) => {
  const usuario = req.body;
  try {
    if(req.files?.foto_usuario) {
      const resultado = await uploadImage(req.files.foto_usuario.tempFilePath);
      usuario.foto = {
        public_id: resultado.public_id,
        secure_url: resultado.secure_url
      }
    }

    const usuarioActual = await obtenerUsuarioPorCorreo(usuario.correo);
    if (!usuarioActual) return res.json({ mensaje: 'Usuario no encontrado en la base de datos.' });

    const progresos = ordenarProgresosPorFecha(usuario?.progresos);
    const progresosUsuarioActual = ordenarProgresosPorFecha(usuarioActual?.progresos);
    const lengthProgresos = progresos?.length;
    const lengthProgresosUsuarioActual = progresosUsuarioActual?.length

    if (!lengthProgresosUsuarioActual && !lengthProgresos) {
      usuario.progresos = [{
        peso: usuario.peso,
        fecha: new Date()
      }]
    }

    if (lengthProgresosUsuarioActual && lengthProgresos) {
      const ultimoPesoRegistrado = progresos[lengthProgresos - 1] ? progresos[lengthProgresos - 1].peso : null;
      const pesoActual = usuarioActual.peso;
      if (lengthProgresosUsuarioActual !== lengthProgresos) usuario.progresos = progresos;
      if (ultimoPesoRegistrado && pesoActual !== ultimoPesoRegistrado) usuario.peso = ultimoPesoRegistrado;
    }

    for (const logroUsuario of usuarioActual.logros) {
      const { logro: { nombre: nombreLogro } } = logroUsuario;
      const logro = usuario?.logros?.find(({ logro: { nombre } }) => nombre?.toLowerCase().trim() === nombreLogro?.toLowerCase().trim());
      if (logro && !logro.realizado) {
        const indiceLogro = usuario.logros.indexOf(logro);
        switch(logro?.logro?.nombre?.toLowerCase().trim()) {
          case 'subir peso':
            usuario.logros[indiceLogro].realizado = logro.pesoObjetivo <= usuario.peso;
            break;
          case 'bajar peso':
            usuario.logros[indiceLogro].realizado = logro.pesoObjetivo >= usuario.peso;
            break;
        }
      }
    }


    const usuarioActualizado = await Usuario.findOneAndUpdate(
      { correo: usuarioActual.correo },
      usuario,
      { new: true }
    );
    usuarioActualizado.logros = await obtenerLogrosUsuario(usuarioActualizado?.logros);
    return res.json(usuarioActualizado);
  } catch (error) {
    console.error(error);
    return res.json({ mensaje: 'Error al tratar de actualizar el usuario'});
  }
});

module.exports = router;
