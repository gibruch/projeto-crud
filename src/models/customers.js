const mongoose = require('mongoose')

// definindo schema - passar todos os campos da collections
const schema = new mongoose.Schema( {
    name: String,
    age: Number,
    email: String,
    password: String,
})

//criar a collection/tabela apartir do schema (padrao MVC) - Model
const Model = mongoose.model('customers', schema)

//exportar o modelo
module.exports = Model