/**
 * Arquivo de Testes de integraçãobundleRenderer.renderToStream
 * Teste de algumas rotas da aplicação
 * Autor: Jimmy Ginga
 * Criado em 08/2020
 * 
 * Importação de módulos.
 */
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../src/app')
const PostChema = require('../src/models/Post')

chai.use(chaiHttp)

/**
 * Início dos testes de integração das rotasbundleRenderer.renderToStream
 * 
 * 
 * Totas não autenticadas do sistema
 */
describe('Teste de integração - Totas não autenticadas do sistema', () => {
    /**
     * Rota para homepage do sistema
     */
    it('localhost:3003/api - GET', () => {
        chai.request(app)
            .get('/api/')
            .end((err, res) => {
                chai.expect(err).to.be.null
                chai.expect(res).to.have.status(200)
            })
    })
    it('localhost:3003/api/user - GET', () => {
        chai.request(app)
            .get('/api/user')
            .end((err, res) => {
                chai.expect(err).to.be.null
                chai.expect(res).to.have.status(200)
            })
    })
    it('localhost:3003/api/register - GET', () => {
        chai.request(app)
            .post('/api/user/register')
            .end((err, res) => {
                chai.expect(err).to.be.null
                chai.expect(res).to.have.status(200)
            })
    })
})