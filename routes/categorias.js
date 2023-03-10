const { Router } =  require('express')
const { check } = require('express-validator')

const { validarCampos, validarJWT, esAdminRole } = require('../middlewares')
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias')
const { existeCategoriaPorId } = require('../helpers/db-validators')

const router = Router()



router.get('/', obtenerCategorias)

router.get('/:id',[
  check('id', 'El id es obligatorio').isMongoId(),
  check('id').custom( existeCategoriaPorId),
  validarCampos
] ,obtenerCategoria)


// crear categoria - privado - cualquier persona con un token valido
router.post('/',[ 
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  validarCampos
  ], crearCategoria )

router.put('/:id',[
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('id').custom( existeCategoriaPorId),
  validarCampos
] ,actualizarCategoria)


router.delete('/:id',[
  validarJWT,
  esAdminRole,
  check( 'id', 'No es un id de mongo ').isMongoId(),
  check('id').custom( existeCategoriaPorId ),
  validarCampos
], borrarCategoria)

module.exports = router;