/**
 * Arquivo de Controllers e rotas para posts
 * Autor: Jimmy Ginga
 * Criado em 08/2020
 * 
 * Importação de módulos.
 */
const express = require('express')
const router = express.Router()
const Post = require('../../models/Post')
const authMiddleware = require('../../middlewares/auth')

router.use(authMiddleware)
/**
 * Função para mostror todos os posts cadastrados
 */
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('user')
        return res.status(200).send({posts})
    } catch (err) {
        return res.status(400).send({mensagem : 'Erro ao listar posts: '+ err})
    }
})
/**
 * Função para mostror post individual
 */
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId).populate('user')
        return res.status(200).send({post})
    } catch (err) {
        return res.status(400).send({mensagem : 'Erro ao listar post: '+ err})
    }
})
/**
 * Função para cadastrar novos posts no bd
 */
router.post('/', async (req, res) => {
    const {title} = req.body
    try {
        if( await Post.findOne({title}) )return res.status(400).send({mensagem: 'Post existente'})

        const post =  await Post.create({user: req.userId, ...req.body})

        return res.status(200).send({post})       
    } catch (err) {
        return res.status(400).send({mensagem : 'Erro ao cadastrar post: '+ err})         
    }
})
/**
 * Função para editar post registrado
 */
router.put('/:postId', async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.postId, {...req.body}, {new:true})
        return res.status(400).send({post})
    } catch (err) {
        return res.status(400).send({mensagem : 'Erro ao actualizar post: '+ err})
    }
})
/**
 * Função para deletar post
 */
router.delete('/:postId', async (req, res) => {
   try {
       await Post.findByIdAndRemove(req.params.postId)
       return res.status(200).send() 
   } catch (err) {
        return res.status(400).send({mensagem : 'Erro ao apagar post: '+ err})
   }
})
//Exportando o módulo, e adicionando a rota.
module.exports = app => app.use('/api/posts', router)