/**
 * Arquivo de Core da aplicação.
 * Autor: Jimmy Ginga
 * Criado em 08/2020
 * 
 * Importação de módulos.
 */
const app = require('express')()
const bodyparser = require('body-parser')



app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allowe-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader("Content-Type","application/json")
    req.header("Content-Type","application/json")
    next()
})
// Configurando o body-paeser
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended : true }))

// Configurando rotas, e tornando o [app] dusponíveis para elas
//  rotas autenticadas
require('./controllers/auth/userController')(app)
require('./controllers/auth/painelController')(app)
require('./controllers/auth/postController')(app)
//  rotas não autenticada
require('./controllers/homeController')(app)

//Exportando o módulo, e adicionando a rota.
module.exports = app 