const { response } = require("express");
const Medico = require("../models/medico");

const getMedicos = async (request, response = response) => {
  const medicos = await Medico.find()
    .populate("usuario", "nombre img") // para obtener el nombre  y la imagen del usuario que creo el hospital, usuario pertecene a hospital
    .populate("hospital", "nombre img"); // para obtener el nombre  y la imagen del usuario que creo el hospital, usuario pertecene a hospital

  response.json({
    ok: true,
    medicos,
  });
};

const crearMedico = async (request, response = response) => {
  const id = request.id; // este id esta ya que paso por el middleware del token
  const medico = new Medico({
    usuario: id,
    ...request.body,
  }); // aca viene el nombre y hospital y ademas le inserto el id de usuario

  try {
    const medicoDB = await medico.save();

    response.json({
      ok: true,
      Medico: medicoDB,
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const actualizarMedico = async (request, response = response) => {
  const medicoId = request.params.id;
  const userId = request.id
  
  try {
    const medico = await Medico.findById(medicoId);

    if (!medico) {
      return response.status(404).json({
        ok: false,
        msg: "medico no encontrado",
      });
    }

    const cambiosMedico = {
      ...request.body,
      usuario: userId
    }
    
    const MedicoActualizado = await Medico.findByIdAndUpdate(medicoId,cambiosMedico,{new:true})

    response.json({
      ok: true,
      hospital:MedicoActualizado
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      msg: "Error Inesperado",
    });
  }
};

const borrarMedico = async (request, response = response) => {
  const medicoId = request.params.id;
  try {
    const medico = await Medico.findById(medicoId);

    if (!medico) {
      return response.status(404).json({
        ok: false,
        msg: "medico no encontrado",
      });
    }

    await Medico.findByIdAndDelete(medicoId)     

    response.json({
      ok: true,
      msg: 'Medico Eliminado'
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      msg: "Error Inesperado",
    });
  }
};

module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
};
