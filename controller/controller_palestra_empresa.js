/************************************************************************************
 * Objetvo: Implementa a regra de negócio entre o app e a model
 * Autores: Cleiton / MKVC
 * Data: 02/06/2023
 * Versão: 1.0
 ************************************************************************************/

//Import do arquivo de acesso ao BD



//Import do arquivo de glodal de configurações do projeto
const message = require('./modulo/config.js');
const palestraEmpresaDAO = require('../model/DAO/palestra-empresaDAO.js')
const palestraDAO = require('../model/DAO/palestraDAO.js')
const empresaDAO = require('../model/DAO/empresaDAO.js')


//Função para retornar todos os itens da tabela recebidos da Model
const selecionarTodasPalestras = async function() {

    //Solicita ao DAO todas as cidades do BD
    let dadosPalestra = await palestraEmpresaDAO.selectAllPalestra_Empresa()
        //Cria um objeto do tipo json
    let dadosJson = {}

    //Valida se BD teve registros
    if (dadosPalestra) {
        //Adiciona o array de alunos em um JSON para retornar ao app
        dadosJson.status = 200
        dadosJson.count = dadosPalestra.length
        dadosJson.palestras = dadosPalestra
        return dadosJson
    } else {
        return message.ERROR_NOT_FOUND
    }

}

//Função para buscar um item filtrado pelo ID, que será encaminhado pela Model
const buscarIdPalestra = async function(id) {

    //Validação para o ID
    if (id == '' || id == undefined || isNaN(id))
        return message.ERROR_REQUIRED_ID
    else {
        //Solicita ao DAO todos os alunos do BD
        let dadosPalestra = await palestraEmpresaDAO.selectPalestra_EmpresaById(id)

        //Cria um objeto do tipo json
        let dadosJson = {}

        //Valida se BD teve registros
        if (dadosPalestra) {
            //Adiciona o array de cidades em um JSON para retornar ao app
            dadosJson.status = 200
            dadosJson.palestra = dadosPalestra
            return dadosJson
        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

//Função para receber os dados do APP e enviar para a Model para inderir um novo item
const inserirPalestra = async function(dadosPalestra) {


    //Validação dos dados
    if (dadosPalestra.id_palestra == undefined || dadosPalestra.id_palestra == '' || isNaN(dadosPalestra.id_palestra) ||
        dadosPalestra.id_empresa == undefined || dadosPalestra.id_empresa == '' || isNaN(dadosPalestra.id_empresa)) {

        return message.ERROR_REQUIRED_DATA

    } else {

        let empresa = await empresaDAO.selectByIdEmpresa(dadosPalestra.id_empresa)
        let palestra = await palestraDAO.selectPalestraById(dadosPalestra.id_palestra)

        if (empresa == false || palestra == false)
            return message.ERROR_NOT_FOUND_FK

        let status = await palestraEmpresaDAO.insertPalestra_Empresa(dadosPalestra)

        if (status) {
            let dadosJson = {}

            let palestraNovoId = await palestraEmpresaDAO.selectLastId()
            dadosPalestra.id = palestraNovoId

            dadosJson.status = message.CREATED_ITEM.status
            dadosJson.palestra = dadosPalestra

            return dadosJson
        } else
            return message.ERROR_INTERNAL_SERVER
    }

}

//Função para receber os dados do APP e enviar para a Model para atualizar um item existente
const atualizarPalestra = async function(dadosPalestra, idPalestra) {


    if (dadosPalestra.id_palestra == undefined || dadosPalestra.id_palestra == '' || isNaN(dadosPalestra.id_palestra) ||
        dadosPalestra.id_empresa == undefined || dadosPalestra.id_empresa == '' || isNaN(dadosPalestra.id_empresa)) {

        return message.ERROR_REQUIRED_DATA

    } else {

        //Validação para ver se o registro passado existe no bd
        let selectID = await palestraEmpresaDAO.selectPalestra_EmpresaById(idPalestra)

        if (selectID == false)
            return message.ERROR_NOT_FOUND_ID

        let empresa = await empresaDAO.selectByIdEmpresa(dadosPalestra.id_empresa)
        let palestra = await palestraDAO.selectPalestraById(dadosPalestra.id_palestra)

        if (empresa == false || palestra == false)
            return message.ERROR_NOT_FOUND_FK

        //Adiciona o ID no JSON com todos os dados
        dadosPalestra.id = idPalestra
            //Encaminha para o DAO os dados para serem alterados
        let status = await palestraEmpresaDAO.updatePalestra_Empresa(dadosPalestra)

        if (status) {
            let dadosJson = {}
            dadosJson.status = message.UPDATED_ITEM.status
            dadosJson.palestra = dadosPalestra

            return dadosJson

        } else {
            return message.ERROR_INTERNAL_SERVER

        }


    }
}

//Função para excluir um aluno filtrado pelo ID, será encaminhado para a Model
const deletarPalestra = async function(dadosPalestra, id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_REQUIRED_ID
    } else {
        dadosPalestra.id = id
        let status = await palestraEmpresaDAO.deletePalestra_Empresa(id)

        if (status) {
            return message.DELETED_ITEM
        } else {
            return message.ERROR_INTERNAL_SERVER

        }
    }

}

module.exports = {
    selecionarTodasPalestras,
    buscarIdPalestra,
    inserirPalestra,
    atualizarPalestra,
    deletarPalestra
}