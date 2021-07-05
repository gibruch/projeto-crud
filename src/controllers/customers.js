const CustomersModel = require('../models/customers')
const { crypto } = require('../utils/password') // importa utils function crypto

const defaultTitle = 'Cadastro de Clientes'

function index(req, res) {
    res.render('register', {
        title: defaultTitle
    })
}

async function add(req, res) {
    const {
        name,
        age,
        email,
        password,
    } = req.body

    const passwordCrypto = await crypto(password)

    //salvar os dados collector
    const register = new CustomersModel( {
        name,
        age,
        email,
        password: passwordCrypto,
    })
    register.save()
    res.render('register', {
        title: defaultTitle,
        message: 'Cadastro realizado com sucesso!'
    })
    res.end()
}

async function list(req, res) {
    //Ir no banco de dados e buscar os clientes
    const users = await CustomersModel.find() // procurar todo mundo deve passar vazio no find
    res.render('list', {
        title: 'Listagem de Usuários',
        users,
    })
}

async function formEdit(req, res) {
    const { id } = req.query // [query] recebido pelo metodo get
    const user = await CustomersModel.findById(id) // metdodo para procurar pelo id

    res.render('edit', {
        title: 'Editar Usuário',
        user,
    })
}

async function edit(req, res) {
    const {
        name,
        age,
        email,
    } = req.body // dados do formulario

    //recuperar o _id para depois localizar no BD  
    const { id } = req.params // dados do metodo de rota

    //Salvar/gravar as alteracoes
    const user = await CustomersModel.findById(id)
    user.name = name
    user.age = age
    user.email = email
    user.save()

    //rendirizar a pagina apos alteracao/edicao
    res.render('edit', {
        title: 'Editar Usuário',
        user,
        message: 'Usuário alterado com sucesso!'
    })
}

async function remove(req, res) {
    const { id } = req.params

    const remove = await CustomersModel.deleteOne({ _id: id})

    if (remove.ok) {
        res.redirect('/list') // redirecinar para pagina /list usar os metódos/opções já existentes no list
    }
}

module.exports = {
    index,
    add,
    list,
    formEdit,
    edit,
    remove,
}