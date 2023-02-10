const { Router } =  require('express')
const { check } = require('express-validator')

const { validarCampos, validarJWT } = require('../middlewares')
const { crearCategoria } = require('../controllers/categorias')

const router = Router()



router.get('/', ( req,res ) => {

  res.json({
    msg:' Todo esta bien ' 
  })
})

router.get('/:id', ( req,res ) => {

  res.json({
    msg:' Todo esta bien  get - id' 
  })
})


// crear categoria - privado - cualquier persona con un token valido
router.post('/',[ 
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  validarCampos
  ], crearCategoria )

router.put('/:id', ( req,res ) => {

  res.json({
    msg:' Todo esta bien  put - id' 
  })
})


router.delete('/:id', ( req,res ) => {

  res.json({
    msg:' Todo esta bien delete - id' 
  })
})

module.exports = router;