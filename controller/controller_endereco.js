/************************************************************************************
 * Objetvo: Implementa a regra de negócio entre o app e a model
 * Autores: Cleiton / MKVC
 * Data: 21/05/2023
 * Versão: 1.0
 ************************************************************************************/

//Import do arquivo de acesso ao BD
const cidadeDAO = require('../model/DAO/cidadeDAO.js')
const enderecoDAO = require('../model/DAO/enderecoDAO.js')

//Import do arquivo de glodal de configurações do projeto
const message = require('./modulo/config.js')

//Função para retornar todos os itens da tabela recebidos da Model
const selecionarTodosEnderecos = async function() {

    //Solicita ao DAO todas as cidades do BD
    let dadosEnderecos = await enderecoDAO.selectAllEndereco()
        //Cria um objeto do tipo json
    let dadosJson = {}

    //Valida se BD teve registros
    if (dadosEnderecos) {
        //Adiciona o array de alunos em um JSON para retornar ao app
        dadosJson.status = 200
        dadosJson.count = dadosEnderecos.length
        dadosJson.enderecos = dadosEnderecos
        return dadosJson
    } else {
        return message.ERROR_NOT_FOUND
    }

}

//Função para buscar um item filtrado pelo ID, que será encaminhado pela Model
const buscarIdEndereco = async function(id) {

    //Validação para o ID
    if (id == '' || id == undefined || isNaN(id))
        return message.ERROR_REQUIRED_ID
    else {
        //Solicita ao DAO todos os alunos do BD
        let dadosEndereco = await enderecoDAO.selectEnderecoById(id)

        //Cria um objeto do tipo json
        let dadosJson = {}

        //Valida se BD teve registros
        if (dadosEndereco) {
            //Adiciona o array de cidades em um JSON para retornar ao app
            dadosJson.status = 200
            dadosJson.endereco = dadosEndereco
            return dadosJson
        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

//Função para receber os dados do APP e enviar para a Model para inderir um novo item
const inserirEndereco = async function(dadosEndereco) {


    if (dadosEndereco.logradouro == undefined || dadosEndereco.logradouro == '' || dadosEndereco.logradouro.length > 100 ||
        dadosEndereco.cep == undefined || dadosEndereco.cep == '' || dadosEndereco.cep.length > 10 ||
        dadosEndereco.numero == undefined || dadosEndereco.numero == '' || dadosEndereco.numero.length > 10 ||
        dadosEndereco.complemento == undefined || dadosEndereco.complemento == '' || dadosEndereco.complemento.length > 15 ||
        dadosEndereco.bairro == undefined || dadosEndereco.bairro == '' || dadosEndereco.bairro.length > 50 ||
        dadosEndereco.id_cidade == undefined || dadosEndereco.id_cidade == '' || isNaN(dadosEndereco.id_cidade)) {
        return message.ERROR_REQUIRED_DATA
    } else {

        let FK_cidade = await cidadeDAO.selectCidadeById(dadosEndereco.id_cidade)

        if (FK_cidade) {
            let status = await enderecoDAO.insertEndereco(dadosEndereco)

            if (status) {
                let dadosJson = {}

                let enderecoNovoId = await enderecoDAO.selectLastId()
                dadosEndereco.id = enderecoNovoId

                dadosJson.status = message.CREATED_ITEM.status
                dadosJson.endereco = dadosEndereco

                return dadosJson
            } else
                return message.ERROR_INTERNAL_SERVER
        } else {
            return message.ERROR_NOT_FOUND_FK
        }
    }

}

//Função para receber os dados do APP e enviar para a Model para atualizar um item existente
const atualizarEndereco = async function(dadosEndereco, idEndereco) {

    //Validação de dados
    if (dadosEndereco.logradouro == undefined || dadosEndereco.logradouro == '' || dadosEndereco.logradouro.length > 100 ||
        dadosEndereco.cep == undefined || dadosEndereco.cep == '' || dadosEndereco.cep.length > 10 ||
        dadosEndereco.numero == undefined || dadosEndereco.numero == '' || dadosEndereco.numero.length > 10 ||

        dadosEndereco.bairro == undefined || dadosEndereco.bairro == '' || dadosEndereco.bairro.length > 50 ||
        dadosEndereco.id_cidade == undefined || dadosEndereco.id_cidade == '' || isNaN(dadosEndereco.id_cidade)) {
        return message.ERROR_REQUIRED_DATA
            //Validação para o id
    } else if (idEndereco == '' || idEndereco == undefined || isNaN(idEndereco)) {
        return message.ERROR_REQUIRED_ID

    } else {


        //Validação para ver se o registro passado existe no bd
        let selectID = await enderecoDAO.selectEnderecoById(idEndereco)

        if (selectID == false)
            return message.ERROR_NOT_FOUND_ID

        let FK_cidade = await cidadeDAO.selectCidadeById(dadosEndereco.id_cidade)

        //Adiciona o ID no JSON com todos os dados
        dadosEndereco.id = idEndereco
        if (FK_cidade) {


            //Encaminha para o DAO os dados para serem alterados
            let status = await enderecoDAO.updateEndereco(dadosEndereco)

            if (status) {
                let dadosJson = {}
                dadosJson.status = message.UPDATED_ITEM.status
                dadosJson.endereco = dadosEndereco

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
const deletarEndereco = async function(dadosEndereco, id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_REQUIRED_ID
    } else {
        dadosEndereco.id = id
        let status = await enderecoDAO.deleteEndereco(id)

        if (status) {
            return message.DELETED_ITEM
        } else {
            return message.ERROR_INTERNAL_SERVER

        }
    }

}

module.exports = {
    selecionarTodosEnderecos,
    buscarIdEndereco,
    inserirEndereco,
    atualizarEndereco,
    deletarEndereco
}