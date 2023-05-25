/************************************************************************************
 * Objetvo: Implementa a regra de negócio entre o app e a model
 * Autores: Cleiton / MKVC
 * Data: 21/05/2023
 * Versão: 1.0
 ************************************************************************************/

//Import do arquivo de acesso ao BD
const cidadeDAO = require('../model/DAO/cidadeDAO.js')
const estadoDAO = require('../model/DAO/estadoDAO.js')

//Import do arquivo de glodal de configurações do projeto
const message = require('./modulo/config.js')

//Função para retornar todos os itens da tabela recebidos da Model
const selecionarTodasCidades = async function() {

    //Solicita ao DAO todas as cidades do BD
    let dadosCidade = await cidadeDAO.selectAllCidades()
        //Cria um objeto do tipo json
    let dadosJson = {}

    //Valida se BD teve registros
    if (dadosCidade) {
        //Adiciona o array de alunos em um JSON para retornar ao app
        dadosJson.status = 200
        dadosJson.count = dadosCidade.length
        dadosJson.cidades = dadosCidade
        return dadosJson
    } else {
        return message.ERROR_NOT_FOUND
    }

}

//Função para buscar um item filtrado pelo ID, que será encaminhado pela Model
const buscarIdCidade = async function(id) {

    //Validação para o ID
    if (id == '' || id == undefined || isNaN(id))
        return message.ERROR_REQUIRED_ID
    else {
        //Solicita ao DAO todos os alunos do BD
        let dadosCidades = await cidadeDAO.selectCidadeById(id)

        //Cria um objeto do tipo json
        let dadosJson = {}

        //Valida se BD teve registros
        if (dadosCidades) {
            //Adiciona o array de cidades em um JSON para retornar ao app
            dadosJson.status = 200
            dadosJson.cidade = dadosCidades
            return dadosJson
        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

//Função para receber os dados do APP e enviar para a Model para inderir um novo item
const inserirCidade = async function(dadosCidade) {


    if (dadosCidade.nome == undefined || dadosCidade.nome == '' || dadosCidade.nome.length > 100 ||
        dadosCidade.id_estado == undefined || dadosCidade.id_estado == '' || isNaN(dadosCidade.id_estado)) {
        return message.ERROR_REQUIRED_DATA
    } else {

        let FK_estado = await estadoDAO.selectEstadoById(dadosCidade.id_estado)

        if (FK_estado) {
            let status = await cidadeDAO.insertCidade(dadosCidade)

            if (status) {
                let dadosJson = {}

                let cidadeNovoId = await cidadeDAO.selectLastId()
                dadosCidade.id = cidadeNovoId

                dadosJson.status = message.CREATED_ITEM.status
                dadosJson.cidade = dadosCidade

                return dadosJson
            } else
                return message.ERROR_INTERNAL_SERVER
        } else {
            return message.ERROR_NOT_FOUND_FK
        }
    }

}

//Função para receber os dados do APP e enviar para a Model para atualizar um item existente
const atualizarCidade = async function(dadosCidade, idCidade) {

    //Validação de dados
    if (dadosCidade.nome == undefined || dadosCidade.nome == '' || dadosCidade.nome.length > 100 ||
        dadosCidade.id_estado == undefined || dadosCidade.id_estado == '' || isNaN(dadosCidade.id_estado)) {
        return message.ERROR_REQUIRED_DATA

        //Validação para o id
    } else if (idCidade == '' || idCidade == undefined || isNaN(idCidade)) {
        return message.ERROR_REQUIRED_ID

    } else {


        //Validação para ver se o registro passado existe no bd
        let selectID = await cidadeDAO.selectCidadeById(idCidade)

        if (selectID == false)
            return message.ERROR_NOT_FOUND_ID

        let FK_estado = await estadoDAO.selectEstadoById(dadosCidade.id_estado)

        //Adiciona o ID no JSON com todos os dados
        dadosCidade.id = idCidade
        if (FK_estado) {


            //Encaminha para o DAO os dados para serem alterados
            let status = await cidadeDAO.updateCidade(dadosCidade)

            if (status) {
                let dadosJson = {}
                dadosJson.status = message.UPDATED_ITEM.status
                dadosJson.cidade = dadosCidade

                return dadosJson

            } else {
                return message.ERROR_INTERNAL_SERVER

            }
        } else {
            return message.ERROR_NOT_FOUND_FK
        }

    }
}

//Função para excluir um aluno filtrado pelo ID, será encaminhado para a Model
const deletarCidade = async function(dadosCidade, id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_REQUIRED_ID
    } else {
        dadosCidade.id = id
        let status = await cidadeDAO.deleteCidade(id)

        if (status) {
            return message.DELETED_ITEM
        } else {
            return message.ERROR_INTERNAL_SERVER

        }
    }

}

module.exports = {
    selecionarTodasCidades,
    buscarIdCidade,
    inserirCidade,
    atualizarCidade,
    deletarCidade
}