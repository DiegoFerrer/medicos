const { response } = require("express");
const Usuario = require("../models/user");
const bcrypt = require("bcryptjs");
const generarJWT = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (request, response = response) => {
  const { email, password } = request.body;

  try {
    const usuarioDB = await Usuario.findOne({ email });

    // verficar email
    if (!usuarioDB) {
      return response.status(404).json({
        ok: false,
        msg: "Email no encontrado",
      });
    }
    // verificar contraseña
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return response.status(404).json({
        ok: false,
        msg: "Contraseña no valida",
      });
    }

    // GENERAR EL JWT
    const token = await generarJWT(usuarioDB.id);

    response.json({
      ok: true,
      token,
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

////###############################################################################

const googleSignIn = async (request, response = response) => {
  const googleToken = request.body.token;

  try {
    const { name, email, picture } = await googleVerify(googleToken);

    const usuarioDB = await Usuario.findOne({email})

    let usuario;

    if(!usuarioDB){
        usuario = new Usuario({
            nombre: name,
            email,
            password:'@@@',
            img:picture,
            google:true
        })
    } else{
        // existe usuario
        usuario = usuarioDB
        usuario.google = true
    }

    // Guardar en DB
    await usuario.save()
    
    // Generar JWT
    const token = await generarJWT(usuario.id);

    response.json({
      ok: true,
      token
    });
  } catch (error) {
    response.status(401).json({
      ok: false,
      msg: "Token Google no valido",
    });
  }
};

////###############################################################################
const renovarToken = async (request,response) => {

  const id = request.validPassword
  const uid = request.id
  // GENERAR EL JWT
  const token = await generarJWT(id);

  // Obtener el usuario por id
  const usuario = await Usuario.findById(uid)

  response.json({
    ok:true,
    token,
    usuario
  })
}


module.exports = {
  login,
  googleSignIn,
  renovarToken
};
