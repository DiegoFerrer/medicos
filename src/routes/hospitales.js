const {Router} = require('express')
const {check} = require('express-validator')
const { getHospitales,borrarHospital,actualizarHospital,crearHospital } = require('../controllers/hospitales')
const {validarCampos} = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()

router.get('/', getHospitales)

//todo validar que los campos no sean vacios
// si son varios middleware van entre [] si es uno solo, va el nombre directamente
router.post('/',
[
    validarJWT,
    check('nombre','El nombre del hospital es necesario').not().isEmpty(),
    validarCampos
],
crearHospital)

router.put('/:id',
[
    validarJWT,
    check('nombre','El nombre del hospital es necesario').not().isEmpty(),],
    validarCampos,
actualizarHospital
)

router.delete('/:id',validarJWT,
borrarHospital
)


module.exports = router