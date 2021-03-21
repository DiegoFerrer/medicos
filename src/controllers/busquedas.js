const { response } = require("express");
const Usuario = require("../models/user");
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");

const getTodo = async (request, response = response) => {
  const busqueda = request.params.busqueda;
  const regex = new RegExp(busqueda, "i"); // expresiones regulares

  const [usuarios, medicos, hospitales] = await Promise.all([
    Usuario.find({ nombre: regex }),
    Medico.find({ nombre: regex }),
    Hospital.find({ nombre: regex }),
  ]);

  response.json({
    ok: true,
    usuarios,
    medicos,
    hospitales,
  });
};

const getDocumentCollection = async (request, response = response) => {
  const collection = request.params.tabla;
  const busqueda = request.params.busqueda;
  const regex = new RegExp(busqueda, "i"); // expresiones regulares

  let data = [];

  switch (collection) {
    case "medicos":
      data = await Medico.find({ nombre: regex })
        .populate("usuario", "nombre img")
        .populate("hospitales", "nombre img");
      break;
    case "hospitales":
      data = await Hospital.find({ nombre: regex }).populate(
        "usuario",
        "nombre img"
      );
      break;
    case "usuarios":
      data = await Usuario.find({ nombre: regex });
      break;
    default:
      return response.status(400).json({
        ok: false,
        msg: "La tabla tiene que ser medicos,usuarios u hospitales",
      });
  }
  response.json({
    ok: true,
    resultados: data,
  });
};

module.exports = {
  getTodo,
  getDocumentCollection,
};
