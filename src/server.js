const express = require('express')
const path = require('path')

const db = require('./database')
const routes = require('./routes')

const app = express()

/*foi tudo includo no arquivo: database/index.js - só para conexao com banco de dados - para ficar tudo separado/organizado
// conectar no banco de dados
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false')

const db = mongoose.connection // instancia do mongoose

//conexao sem erro - avisa no log
db.once('open', () => {
    console.log('Connected to Database - MongoDB!')
})

//conexao com erro
db.on('error', console.error.bind(console, 'connection error: '))
*/

// conexao com o banco de dados
db.connect()

/*
//inserindo registro no banco de dados
const register = new Model({
    name: 'Gilberto',
    age: 48,
    email: 'gilberto.bruch@gmail.com',
    password: '123456'
})
register.save()*/

// definindo o template engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// definindo os arquivos públicos
app.use(express.static(path.join(__dirname, 'public')))

// habilita server para receber dados via post (formulário)
app.use(express.urlencoded({ extended: true}))

// definindo as rotas
app.use('/', routes)

// 404 error (not found)
app.use((req, res) => {
    res.send('Página não encontrada!')
})

// executando o servidor
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server is listening on port ${port}`))
