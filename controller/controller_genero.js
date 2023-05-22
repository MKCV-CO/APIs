/************************************************************************************
 * Objetvo: Implementa a regra de negócio entre o app e a model
 * Autores: Cleiton / MKVC
 * Data: 21/05/2023
 * Versão: 1.0
 ************************************************************************************/

//Import do arquivo de acesso ao BD
const generoDAO = require('../model/DAO/generoDAO.js')

//Import do arquivo de glodal de configurações do projeto
const message = require('./modulo/config.js')

//Função para retornar todos os itens da tabela recebidos da Model
const selecionarTodosGeneros = async function() {

    //Solicita ao DAO todas as cidades do BD
    let dadosGeneros = await generoDAO.selectAllGenero()
        //Cria um objeto do tipo json
    let dadosJson = {}

    //Valida se BD teve registros
    if (dadosGeneros) {
        //Adiciona o array de alunos em um JSON para retornar ao app
        dadosJson.status = 200
        dadosJson.count = dadosGeneros.length
        dadosJson.Generos = dadosGeneros
        return dadosJson
    } else {
        return message.ERROR_NOT_FOUND
    }

}

//Função para buscar um item filtrado pelo ID, que será encaminhado pela Model
const buscarIdGenero = async function(id) {

    //Validação para o ID
    if (id == '' || id == undefined || isNaN(id))
        return message.ERROR_REQUIRED_ID
    else {
        //Solicita ao DAO todos os alunos do BD
        let dadosGenero = await generoDAO.selectGeneroById(id)

        //Cria um objeto do tipo json
        let dadosJson = {}

        //Valida se BD teve registros
        if (dadosGenero) {
            //Adiciona o array de cidades em um JSON para retornar ao app
            dadosJson.status = 200
            dadosJson.genero = dadosGenero
            return dadosJson
        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

//Função para receber os dados do APP e enviar para a Model para inderir um novo item
const inserirGenero = async function(dadosGenero) {


    if (dadosGenero.nome == undefined || dadosGenero.nome == '' || dadosGenero.nome.length > 100 ||
        dadosGenero.sigla == undefined || dadosGenero.sigla == '' || dadosGenero.sigla.length > 5) {
        return message.ERROR_REQUIRED_DATA
    } else {

        let status = await generoDAO.insertGenero(dadosGenero)

        if (status) {
            let dadosJson = {}

            let generoNovoId = await generoDAO.selectLastId()
            dadosGenero.id = generoNovoId

            dadosJson.status = message.CREATED_ITEM.status
            dadosJson.cidade = dadosGenero

            return dadosJson
        } else
            return message.ERROR_INTERNAL_SERVER
    }

}

//Função para receber os dados do APP e enviar para a Model para atualizar um item existente
const atualizarGenero = async function(dadosGenero, idGenero) {

    //Validação de dados
    if (dadosGenero.nome == undefined || dadosGenero.nome == '' || dadosGenero.nome.length > 100 ||
        dadosGenero.sigla == undefined || dadosGenero.sigla == '' || dadosGenero.sigla.length > 5) {
        return message.ERROR_REQUIRED_DATA

        //Validação para o id
    } else if (idGenero == '' || idGenero == undefined || isNaN(idGenero)) {
        return message.ERROR_REQUIRED_ID

    } else {

        //Validação para ver se o registro passado existe no bd
        let selectID = await generoDAO.selectGeneroById(idGenero)

        if (selectID == false)
            return message.ERROR_NOT_FOUND_ID
                //Adiciona o ID no JSON com todos os dados
        dadosGenero.id = idGenero

        //Encaminha para o DAO os dados para serem alterados
        let status = await generoDAO.updateGenero(dadosGenero)

        if (status) {
            let dadosJson = {}
            dadosJson.status = message.UPDATED_ITEM.status
            dadosJson.genero = dadosGenero

            return dadosJson

        } else {
            return message.ERROR_INTERNAL_SERVER

        }

    }
}

//Função para excluir um aluno filtrado pelo ID, será encaminhado para a Model
const deletarGenero = async function(dadosGenero, id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_REQUIRED_ID
    } else {
        dadosGenero.id = id
        let status = await generoDAO.deleteGenero(id)

        if (status) {
            return message.DELETED_ITEM
        } else {
            return message.ERROR_INTERNAL_SERVER

        }
    }

}

module.exports = {
    selecionarTodosGeneros,
    buscarIdGenero,
    inserirGenero,
    atualizarGenero,
    deletarGenero
}