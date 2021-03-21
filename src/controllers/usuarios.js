//?----------------------------------------- I M P O R T S ---------------------------------------------------------------------

const { response } = require("express");
const Usuario = require("../models/user");
const bcrypt = require("bcryptjs");
const generarJWT = require("../helpers/jwt");

////############################################################################################################################
const getUsuarios = async (request, response) => {
  const desde = Number(request.query.desde) || 0; // queryparam, si no hay guarda 0

  const [usuarios,totalRegistros] = await Promise.all([  // ejecuta todas las promesas de manera simultanea, esto es para que no tarde mucho estos 2 awaits
    Usuario //todo. PRIMER PROMESA   
      // find({},'nombre email role google img')
      .find()
      // paginacion
      .skip(desde) // se salta todos los anteriores, si estoy en el 0 empieza desde 0 pero si estoy en el 5 no te da los anteriores
      .limit(5), // cuantos registros quiero desde esta posicion

    Usuario.countDocuments() //todo. SEGUNDA PROMESA
  ]);

  response.json({
    ok: true,
    usuarios,
    totalRegistros,
  });
};
////############################################################################################################################
const crearUsuario = async (request, response = response) => {
  const { email, password } = request.body;

  try {
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      return response.status(400).json({
        ok: false,
        msg: "El correo ya esta registrado",
      });
    }
    const usuario = new Usuario(request.body);

    //todo-------------------------------Encriptar contraseña--------------------------------------
    // el salt es data generada de manera aleatoria
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //todo-------------------------------Grabar en la base de datos--------------------------------
    await usuario.save();

    // GENERAR EL JWT
    const token = await generarJWT(usuario.id);

    response.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};
////############################################################################################################################
const actualizarUsuario = async (request, response = response) => {
  const id = request.params.id;
  try {
    const usuarioDB = await Usuario.findById(id);

    if (!usuarioDB) {
      return response.status(404).json({
        ok: false,
        msg: "no existe un usuario por ese id",
      });
    }

    const { password, google, email, ...campos } = request.body; // obtengo los campos en la variable campos pero sacando password y google

    if (!usuarioDB.email === email) {
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail) {
        return response.status(404).json({
          ok: false,
          msg: "ya existe ese email",
        });
      }
    }

    campos.email = email;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(id, campos, {
      new: true,
    });

    response.json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

////############################################################################################################################
const borrarUsuario = async (request, response) => {
  const id = request.params.id;
  try {
    const usuarioDB = await Usuario.findById(id);
    if (!usuarioDB) {
      return response.status(404).json({
        ok: false,
        msg: "no existe un usuario por ese id",
      });
    }

    await Usuario.findByIdAndRemove(id);

    response.json({
      ok: true,
      msg: "Usuario Eliminado",
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

////############################################################################################################################

module.exports = {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
};
