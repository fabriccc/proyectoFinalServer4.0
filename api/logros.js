
const router = require('express').Router();
const Logro = require('../schemas/logro.js');

router.get('/', async function (_, res) {
    const usuarios = await Logro.find();
    return res.json(usuarios);
});

router.get('/:nombre', async function (req, res) {
  const { nombre } = req.params;
  const logro = await Logro.findOne({ nombre });
  if (!logro) return res.json({ mensaje: 'Logro no encontrado en la base de datos.'});
  return res.json(logro);
})

module.exports = router;
