const path = require('path')
const fs = require('fs')
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { actualizarImagen } = require("../helpers/actualizar-imagen");

const fileUpload = (request, response = response) => {
  const tipo = request.params.tipo;
  const id = request.params.id;
  const tiposValidos = ["hospitales", "medicos", "usuarios"];

  if (!tiposValidos.includes(tipo)) {
    return response.status(400).json({
      ok: false,
      msg: "El tipo es incorrecto",
    });
  }

  // se valida que exista un archivo
  if (!request.files || Object.keys(request.files).length === 0) {
    return response.status(400).json({
      ok: false,
      msg: "no hay ningun archivo",
    });
  }

  // procesar la imagen
  const file = request.files.imagen; // tengo acceso a files gracias al middleware
  const nombreCortado = file.name.split(".");
  const extension = nombreCortado[nombreCortado.length - 1]; // ultima posicion

  // validar extension
  const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
  if (!extensionesValidas.includes(extension)) {
    return response.status(400).json({
      ok: false,
      msg: "La extension no es valida",
    });
  }

  // Generar nombre archivo | para que no se sobreescriban si un usuario sube lo mismo
  const nombreArchivo = `${uuidv4()}.${extension}`;

  // path para guard la imagen
  const path = `./src/uploads/${tipo}/${nombreArchivo}`;

  // sube la imagen a la carpeta uploads
  file.mv(path, (error) => {
    if (error){
        console.log(error);
        return response.status(500).json({
            ok:false,
            msg:'Error al mover la imagen'
        })      
    } 
  // actualizar base de datos
  actualizarImagen(tipo,id,nombreArchivo)

    response.json({
        ok: true,
        msg:'Archivo subido',
        nombreArchivo
      });
  });
};

const retornaImagen = (request,response = response) => {
  const tipo = request.params.tipo;
  const foto = request.params.foto

  const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`)
  const defaultImg = path.join(__dirname, '../uploads/default.png')

  // imagen por defecto
  if(fs.existsSync(pathImg)){
    response.sendFile(pathImg)
  } else response.sendFile(defaultImg)


}

module.exports = {
  fileUpload,
  retornaImagen
};
