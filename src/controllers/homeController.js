/**
 * Arquivo de Controller, para rotas não autenticadas
 * Autor: Jimmy Ginga
 * Criado em 08/2020
 * 
 * Importação de módulos.
 */
const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

router.get('/', async(req, res)=>{
    try {
        const posts = await Post.find() 
        res.status(200).send({mensagem: 'Página home do sistema', posts})
    } catch (err) {
        return res.status(400).send({mensagem: 'Erro ao listar postes: '+err})
    }
})

module.exports = app => app.use('/api', router)