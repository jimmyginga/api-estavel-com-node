/**
 * Arquivo de Controllers e rotas para usuários
 * Autor: Jimmy Ginga
 * Criado em 08/2020
 * 
 * Importação de módulos.
 */
const express = require('express')
const User = require('../../models/User')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv-safe').config()


/**
 * Função que gera o token para as requisições
 * @param {user.id} params 
 */
function generateToken(params = {}){
    return jwt.sign( params, process.env.SECRET, { expiresIn: 86400 })
}

/**
 * Função para listar todos os usuários cadastrados
 */
router.get('/', async(req, res)=>{
    try {
        const users = await User.find()
        return res.status(200).json(users)
    } catch (err) {
        return res.status(400).send({mensagem: 'Erro ao listar usuários: '+err})
    }
})
/**
 * Função para listar um usário baseado no Id
 */
router.get('/:userId', async(req, res)=>{
    try {
        const user = await User.findById(req.params.userId)
        return res.status(200).send({user})
    } catch (err) {
        return res.status(400).send({mensagem: 'Erro ao listar usuários: '+err})
    }
})
/**
 * Funçãoo para edição de usuário
 */
router.put('/:userId', async(req, res)=>{
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, {...req.body}, {new:true})

        return res.status(200).send({user, token: generateToken({id: req.params.userId})  })
    } catch (err) {
        return res.status(400).send({mensagem: 'Erro ao listar usuários: '+err})
    }
})
/**
 * Função para cadastrar novos usuários
 */
router.post('/register', async(req, res)=>{
    const { mail } = req.body
    try {
        if( await User.findOne({ mail }))
            return res.status(400).send({mensagem: "Usário existente."})

        const user = await User.create(req.body)
        user.password = undefined
        return res.send({ 
            user,
            token: generateToken({id: user.id}) 
         })
    } catch (err) {
        return res.status(400).send({mensagem : `Erro ao tentar registrar usuário ${err}`})
    }
})
/**
 * Função de login do usuário
 */
router.post('/login', async(req, res)=>{
    const { mail, password } = req.body
    
    const user = await User.findOne({mail}).select('+password')
  
    if(!user)
        return res.status(400).send({mensagem: "Usuánio inesistente."})

    if(! await bcrypt.compare(password, user.password))
        return res.status(400).send({ mensagem : "Senha inválida" })
    
    user.password = undefined;
    res.send({ 
        user, 
        token: generateToken({id: user.id, name: user.name, mail: user.mail})
     })
})
//Exportando o módulo, e adicionando a rota.
module.exports = app => app.use('/api/user', router)