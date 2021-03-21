const {Router} = require('express')
const {getUsuarios,crearUsuario,actualizarUsuario, borrarUsuario} = require('../controllers/usuarios')
const router = Router()
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

router.get('/',validarJWT, getUsuarios)

//todo validar que los campos no sean vacios
// si son varios middleware van entre [] si es uno solo, va el nombre directamente
router.post('/',
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    validarCampos
],
crearUsuario)

router.put('/:id',
[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('role','El role es obligatorio').not().isEmpty(),
    validarCampos
],
actualizarUsuario
)

router.delete('/:id',
validarJWT,
borrarUsuario
)


module.exports = router