/************************************************************************************
 * Objetvo: Implementa a regra de negócio entre o app e a model
 * Autores: Cleiton / MKVC
 * Data: 21/05/2023
 * Versão: 1.0
 ************************************************************************************/

//Import do arquivo de acesso ao BD
const palestraDAO = require('../model/DAO/palestraDAO.js')

//Função para validar a data
function validarDataMySQL(data) {
    // Expressão regular para verificar o formato da data (AAAA-MM-DD)
    var regex = /^\d{4}-\d{2}-\d{2}$/;

    // Verifica o formato da data
    if (!regex.test(data)) {
        return false;
    }
}

//Import do arquivo de glodal de configurações do projeto
const message = require('./modulo/config.js');
const escolaDAO = require('../model/DAO/escolaDAO.js');

//Função para retornar todos os itens da tabela recebidos da Model
const selecionarTodasPalestras = async function() {

    //Solicita ao DAO todas as cidades do BD
    let dadosPalestra = await palestraDAO.selectAllPalestra()
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
        let dadosPalestra = await palestraDAO.selectPalestraById(id)

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
    if (dadosPalestra.objetivo == undefined || dadosPalestra.objetivo == '' ||
        dadosPalestra.tema == undefined || dadosPalestra.tema == '' || dadosPalestra.tema.length > 100) {

        return message.ERROR_REQUIRED_DATA

        //Validação da data
    } else if (dadosPalestra.data_palestra == undefined || dadosPalestra.data_palestra == '' || validarDataMySQL(dadosPalestra.data_palestra) == false) {
        return message.ERROR_INVALID_DATE_FORMAT
    } else {

        let escola = await escolaDAO.selectEscolaByIdPalestra(dadosPalestra)

        let status = await palestraDAO.insertPalestra(dadosPalestra)

        if (status) {
            let dadosJson = {}

            let palestraNovoId = await palestraDAO.selectLastId()
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

    //Validação dos dados
    if (dadosPalestra.objetivo == undefined || dadosPalestra.objetivo == '' ||
        dadosPalestra.tema == undefined || dadosPalestra.tema == '' || dadosPalestra.tema.length > 100) {
        return message.ERROR_REQUIRED_DATA
            //Validação da data
    } else if (dadosPalestra.data == undefined || dadosPalestra.data == '' || validarDataMySQL(dadosPalestra.data) == false) {
        return message.ERROR_INVALID_DATE_FORMAT
    } else {

        //Validação para ver se o registro passado existe no bd
        let selectID = await palestraDAO.selectPalestraById(idPalestra)

        if (selectID == false)
            return message.ERROR_NOT_FOUND_ID
                //Adiciona o ID no JSON com todos os dados
        dadosPalestra.id = idPalestra
            //Encaminha para o DAO os dados para serem alterados
        let status = await palestraDAO.updatePalestra(dadosPalestra)

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
        let status = await palestraDAO.deletePalestra(id)

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