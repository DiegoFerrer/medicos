const { response } = require("express");
const Hospital = require("../models/hospital");

const getHospitales = async (request, response = response) => {
  const hospitales = await Hospital.find().populate("usuario", "nombre img"); // para obtener el nombre  y la imagen del usuario que creo el hospital, usuario pertecene a hospital

  response.json({
    ok: true,
    hospitales,
  });
};

const crearHospital = async (request, response = response) => {
  const id = request.id; // este id esta ya que paso por el middleware del token
  const hospital = new Hospital({
    usuario: id,
    ...request.body,
  }); // aca viene el nombre y ademas le inserto el id

  try {
    const hospitalDB = await hospital.save();

    response.json({
      ok: true,
      hospital: hospitalDB,
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const actualizarHospital = async (request, response = response) => {
  const hospitalId = request.params.id;
  const userId = request.id
  try {
    const hospital = await Hospital.findById(hospitalId);

    if (!hospital) {
      return response.status(404).json({
        ok: false,
        msg: "hospital no encontrado",
      });
    }

    const cambiosHospital = {
      ...request.body,
      usuario: userId
    }
    
    const hospitalActualizado = await Hospital.findByIdAndUpdate(hospitalId,cambiosHospital,{new:true})

    response.json({
      ok: true,
      hospital:hospitalActualizado
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      msg: "Error Inesperado",
    });
  }
};

const borrarHospital = async (request, response = response) => {
  const hospitalId = request.params.id;
  try {
    const hospital = await Hospital.findById(hospitalId);

    if (!hospital) {
      return response.status(404).json({
        ok: false,
        msg: "hospital no encontrado",
      });
    }

    await Hospital.findByIdAndDelete(hospitalId)     

    response.json({
      ok: true,
      msg: 'Hospital Eliminado'
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      msg: "Error Inesperado",
    });
  }
};

module.exports = {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
};
