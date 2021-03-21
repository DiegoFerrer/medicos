const {Router} = require('express')
const {check} = require('express-validator')
const { getTodo,getDocumentCollection } = require('../controllers/busquedas')
const {validarCampos} = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')


const router = Router()

router.get('/:busqueda',validarJWT,getTodo)

router.get('/coleccion/:tabla/:busqueda',validarJWT,getDocumentCollection)




module.exports = router