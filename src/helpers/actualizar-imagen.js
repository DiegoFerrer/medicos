const fs = require('fs')
const Usuario = require('../models/user')
const Medico = require('../models/medico')
const Hospital = require('../models/hospital')

const borrarImagen = path => {
    if(fs.existsSync(path)){
        // borrar la imagen vieja
        fs.unlinkSync(path)
    }
}

const actualizarImagen = async (tipo,id,nombreArchivo) =>{
    let pathViejo = ''
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id)
            if(!medico) return false
            
            pathViejo = `./src/uploads/medicos/${medico.img}`
            borrarImagen(pathViejo)

            medico.img = nombreArchivo
            await medico.save()
            break;
        case 'hospitales':
            const hospital = await Hospital.findById(id)
            if(!hospital) return false
            
            pathViejo = `./src/uploads/hospitales/${hospital.img}`
            borrarImagen(pathViejo)

            hospital.img = nombreArchivo
            await hospital.save()
        
            break;
        case 'usuarios':
            const usuario = await Usuario.findById(id)
            if(!usuario) return false
            
            pathViejo = `./src/uploads/usuarios/${usuario.img}`
            borrarImagen(pathViejo)

            usuario.img = nombreArchivo
            await usuario.save()
            break;
        default:
            break;
    }
}

module.exports = {
    actualizarImagen
}