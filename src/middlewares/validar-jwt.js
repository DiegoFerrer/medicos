const jwt = require('jsonwebtoken')

const validarJWT =(request,response,next) =>{
    // leer el token
    const token = request.header('Authorization')

    if(!token){
        return response.status(401).json({
            ok:false,
            msg:'No hay token'
        })
    }

    // verificar token
    try {

        const {id} = jwt.verify(token,process.env.JWT_SECRET)
        request.id = id

        
        next()
    } catch (error) {
        return response.status(401).json({
            ok:false,
            msg:'Token invalido'
        })
    }


}

module.exports = {
    validarJWT
}