/**
 * Arquivo de Servidor da aplicação
 * Autor: Jimmy Ginga
 * Criado em 08/2020
 * 
 * Importação de módulos.
 */
const http = require('http')
const port = process.env.PORT || 3003
const app = require('./app')
const server = http.createServer(app)

/**
 * Função listen, responsável por observar a porta 3003 e ligar a aplicaçã à ela
 */
server.listen(port, err =>{
    if(err) console.log(`Erro ao iniciar servidor ${err}`)
    console.log(`Servidor em execução na porta ${port}`)
})