/**
 * Arquivo de Middleware
 * Autor: Jimmy Ginga
 * Criado em 08/2020
 * 
 * Importação de módulos.
 */
const jwt = require('jsonwebtoken')
require('dotenv-safe').config()
/**
 * Função middleware de autenticação de usuário
 * @param {para requesições} req 
 * @param {para respostas} res 
 * @param {para avançar a função em caso afirmativo} next 
 */

const jwtverify = (req, res, next)=>{
    const header = req.headers.authorization
    if(! header)return res.status(401).send({mensagem: 'Nenhum token encontrado.'})

    jwt.verify(header, process.env.SECRET, (err, decoded)=>{
        if(err) return res.status(500).send({mensagem: 'Erro na autenticação do token.'})
    
    req.userId = decoded.id
    return next()
    })
}
//Exportando o módulo, e adicionando a rota.
module.exports = jwtverify