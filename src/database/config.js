/**
 * Arquivo de ligação ao banco de dados
 * Autor: Jimmy Ginga
 * Criado em 08/2020
 * 
 * Importação de módulos.
 */
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/api-nodejs', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = global.Promise
//Exportando o módulo, e adicionando a rota.
module.exports = mongoose