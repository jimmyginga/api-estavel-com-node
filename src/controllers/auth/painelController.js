/**
 * Arquivo de Controllers e rotas para o painel
 * Autor: Jimmy Ginga
 * Criado em 08/2020
 * 
 * Importação de módulos.
 */
const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middlewares/auth')

//Passando o middleware de autenticaçã
router.use(authMiddleware)
/**
 * Função que redireciona ao painel da aplicação caso o usuário esteja autenticado e tenha um token válido
 */
router.get('/', (req, res)=>{
    res.status(200).send({
        mensgen: 'login efetuado com sucesso.',
        userId: req.userId,
        userName: req.userName,
        userMail: req.userMail
    })
    console.log('Done!')
})
//Exportando o módulo, e adicionando a rota.
module.exports = app => app.use('/api/painel', router)