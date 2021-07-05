const mongoose = require('mongoose')

function connect() {
    mongoose.set('useNewUrlParser', true)
    mongoose.set('useUnifiedTopology', true)
    mongoose.connect('mongodb://localhost:27017/projeto-crud?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false')

    const db = mongoose.connection // instancia do mongoose

    //conexao sem erro - avisa no log
    db.once('open', () => {
        console.log('Connected to Database - MongoDB!')
    })

    //conexao com erro
    db.on('error', console.error.bind(console, 'connection error: '))
}

// exportar objeto
module.exports = {
    connect
}