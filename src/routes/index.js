// MVC = CONTROLLER
const router = require('express').Router()

const CustomersController = require('../controllers/customers')
const IndexController = require('../controllers/index')

// chama a definicao de rotas
router.get('/', IndexController.index)

// registro
router.get('/register', CustomersController.index) // chama a rota pagina do formulario clientes
router.post('/register/add', CustomersController.add) //rota para gravacao dos dados do formulario de cadastro/registro dos clientes

// Listar
router.get('/list', CustomersController.list)

// editar
router.get('/edit', CustomersController.formEdit) // renderizar a pagina
router.post('/edit/:id', CustomersController.edit) // editar dados servidor

//remover
router.get('/remove/:id', CustomersController.remove)

module.exports = router