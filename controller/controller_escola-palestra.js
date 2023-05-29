/************************************************************************************
 * Objetvo: Implementa a regra de negócio entre o app e a model
 * Autores: Cleiton / MKVC
 * Data: 21/05/2023
 * Versão: 1.0
 ************************************************************************************/

//Import do arquivo de acesso ao BD
const escolaPalestraDAO = require('../model/DAO/escola-palestraDAO.js')
const escolaDAO = require('../model/DAO/escolaDAO.js')
const palestraDAO = require('../model/DAO/palestraDAO.js')

//Import do arquivo de glodal de configurações do projeto
const message = require('./modulo/config.js')

//Função para retornar todos os itens da tabela recebidos da Model
const selecionarTodasEscolaPalestra = async function() {

    //Solicita ao DAO todas as cidades do BD
    let dadosEscolaPalestra = await escolaPalestraDAO.selectAllEscolaPalestra()
        //Cria um objeto do tipo json
    let dadosJson = {}

    //Valida se BD teve registros
    if (dadosEscolaPalestra) {
        //Adiciona o array de alunos em um JSON para retornar ao app
        dadosJson.status = 200
        dadosJson.count = dadosEscolaPalestra.length
        dadosJson.escola_palestra = dadosEscolaPalestra
        return dadosJson
    } else {
        return message.ERROR_NOT_FOUND
    }

}

//Função para buscar um item filtrado pelo ID, que será encaminhado pela Model
const buscarIdEscolaPalestra = async function(id) {

    //Validação para o ID
    if (id == '' || id == undefined || isNaN(id))
        return message.ERROR_REQUIRED_ID
    else {
        //Solicita ao DAO todos os alunos do BD
        let dadosEscolaPalestra = await escolaPalestraDAO.selectEscolaPalestraById(id)

        //Cria um objeto do tipo json
        let dadosJson = {}

        //Valida se BD teve registros
        if (dadosEscolaPalestra) {
            //Adiciona o array de cidades em um JSON para retornar ao app
            dadosJson.status = 200
            dadosJson.escola_palestra = dadosEscolaPalestra
            return dadosJson
        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

//Função para receber os dados do APP e enviar para a Model para inderir um novo item
const inserirEscolaPalestra = async function(dadosEscolaPalestra) {


    //Validação dos dados
    if (dadosEscolaPalestra.id_escola == undefined || dadosEscolaPalestra.id_escola == '' || isNaN(dadosEscolaPalestra.id_escola) ||
        dadosEscolaPalestra.id_palestra == undefined || dadosEscolaPalestra.id_palestra == '' || isNaN(dadosEscolaPalestra.id_palestra)) {

        return message.ERROR_REQUIRED_DATA

    } else {

        //Recebe o id_genero inserido no POST
        let FK_palestra = await palestraDAO.selectPalestraById(dadosEscolaPalestra.id_palestra)
            //Valida se o id_genero existe no BD
        if (FK_palestra == false)
            return message.ERROR_NOT_FOUND_FK
                //Recebe o id_endereco inserido no POST
        let FK_escola = await escolaDAO.selectEscolaById(dadosEscolaPalestra.id_escola)
            //Valida se o id_endereco existe no BD
        if (FK_escola == false)
            return message.ERROR_NOT_FOUND_FK

        let status = await escolaPalestraDAO.insertEscolaPalestra(dadosEscolaPalestra)

        if (status) {
            let dadosJson = {}

            let escolaPalestraNovoId = await escolaPalestraDAO.selectLastId()
            dadosEscolaPalestra.id = escolaPalestraNovoId

            dadosJson.status = message.CREATED_ITEM.status
            dadosJson.escola_palestra = dadosEscolaPalestra

            return dadosJson
        } else
            return message.ERROR_INTERNAL_SERVER
    }

}


//Função para receber os dados do APP e enviar para a Model para atualizar um item existente
const atualizarEscolaPalestra = async function(dadosEscolaPalestra, idEscolaPalestra) {

    //Validação dos dados
    if (dadosEscolaPalestra.id_escola == undefined || dadosEscolaPalestra.id_escola == '' || isNaN(dadosEscolaPalestra.id_escola) ||
        dadosEscolaPalestra.id_palestra == undefined || dadosEscolaPalestra.id_palestra == '' || isNaN(dadosEscolaPalestra.id_palestra)) {

        return message.ERROR_REQUIRED_DATA

    } else {

        //Validação para ver se o registro passado existe no bd
        let selectID = await escolaPalestraDAO.selectEscolaPalestraById(idEscolaPalestra)

        if (selectID == false)
            return message.ERROR_NOT_FOUND_ID

        //Recebe o id_genero inserido no POST
        let FK_palestra = await palestraDAO.selectPalestraById(dadosEscolaPalestra.id_palestra)
            //Valida se o id_genero existe no BD
        if (FK_palestra == false)
            return message.ERROR_NOT_FOUND_FK
                //Recebe o id_endereco inserido no POST
        let FK_escola = await escolaDAO.selectEscolaById(dadosEscolaPalestra.id_escola)
            //Valida se o id_endereco existe no BD
        if (FK_escola == false)
            return message.ERROR_NOT_FOUND_FK



        //Adiciona o ID no JSON com todos os dados
        dadosEscolaPalestra.id = idEscolaPalestra
            //Encaminha para o DAO os dados para serem alterados
        let status = await escolaPalestraDAO.updateEscolaPalestra(dadosEscolaPalestra)

        if (status) {
            let dadosJson = {}
            dadosJson.status = message.UPDATED_ITEM.status
            dadosJson.escola_palestra = dadosEscolaPalestra

            return dadosJson

        } else {
            return message.ERROR_INTERNAL_SERVER

        }


    }
}

//Função para excluir um aluno filtrado pelo ID, será encaminhado para a Model
const deletarEscolaPalestra = async function(dadosEscolaPalestra, id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_REQUIRED_ID
    } else {
        dadosEscolaPalestra.id = id
        let status = await escolaPalestraDAO.deleteEscolaPalestra(id)

        if (status) {
            return message.DELETED_ITEM
        } else {
            return message.ERROR_INTERNAL_SERVER

        }
    }

}

module.exports = {
    selecionarTodasEscolaPalestra,
    buscarIdEscolaPalestra,
    inserirEscolaPalestra,
    atualizarEscolaPalestra,
    deletarEscolaPalestra
}