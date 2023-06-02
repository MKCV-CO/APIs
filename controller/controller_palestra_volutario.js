/************************************************************************************
 * Objetvo: Implementa a regra de negócio entre o app e a model
 * Autores: Cleiton / MKVC
 * Data: 02/06/2023
 * Versão: 1.0
 ************************************************************************************/

//Import do arquivo de acesso ao BD



//Import do arquivo de glodal de configurações do projeto
const message = require('./modulo/config.js');
const palestraVoluntarioDAO = require('../model/DAO/palestra-voluntarioDAO.js')
const palestraDAO = require('../model/DAO/palestraDAO.js')
const voluntarioDAO = require('../model/DAO/voluntarioDAO.js')


//Função para retornar todos os itens da tabela recebidos da Model
const selecionarTodasPalestras = async function() {

    //Solicita ao DAO todas as cidades do BD
    let dadosPalestra = await palestraVoluntarioDAO.selectAllPalestra_Voluntario()
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
        let dadosPalestra = await palestraVoluntarioDAO.selectPalestra_VoluntarioById(id)

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
        dadosPalestra.id_voluntario == undefined || dadosPalestra.id_voluntario == '' || isNaN(dadosPalestra.id_voluntario)) {

        return message.ERROR_REQUIRED_DATA

    } else {

        let voluntario = await voluntarioDAO.selectVoluntarioById(dadosPalestra.id_voluntario)
        let palestra = await palestraDAO.selectPalestraById(dadosPalestra.id_palestra)

        if (voluntario == false || palestra == false)
            return message.ERROR_NOT_FOUND_FK

        let status = await palestraVoluntarioDAO.insertPalestra_Voluntario(dadosPalestra)

        if (status) {
            let dadosJson = {}

            let palestraNovoId = await palestraVoluntarioDAO.selectLastId()
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
        dadosPalestra.id_voluntario == undefined || dadosPalestra.id_voluntario == '' || isNaN(dadosPalestra.id_voluntario)) {

        return message.ERROR_REQUIRED_DATA

    } else {

        //Validação para ver se o registro passado existe no bd
        let selectID = await palestraVoluntarioDAO.selectPalestra_VoluntarioById(idPalestra)

        if (selectID == false)
            return message.ERROR_NOT_FOUND_ID

        let voluntario = await voluntarioDAO.selectVoluntarioById(dadosPalestra.id_voluntario)
        let palestra = await palestraDAO.selectPalestraById(dadosPalestra.id_palestra)

        if (voluntario == false || palestra == false)
            return message.ERROR_NOT_FOUND_FK

        //Adiciona o ID no JSON com todos os dados
        dadosPalestra.id = idPalestra
            //Encaminha para o DAO os dados para serem alterados
        let status = await palestraVoluntarioDAO.updatePalestra_Voluntario(dadosPalestra)

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
        let status = await palestraVoluntarioDAO.deletePalestra_Voluntario(id)

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