
const cloudinary = require('cloudinary').v2


//CUENTA DE CLOUDINARY
cloudinary.config({
    cloud_name: 'dsterkdaj',
    api_key: '465497755199444',
    api_secret: 'msNRVeQrHc3I39BgPJ1ESy0AEOc',
    secure: true
});

// FUNCION QUE VA CARGANDO LAS IMAGENES EN EL FOLDER: imagenesUsuarios
async function uploadImage(filePath){
  return await cloudinary.uploader.upload(filePath,{
    folder:'imagenesUsuario'
  })
}

module.exports = uploadImage
