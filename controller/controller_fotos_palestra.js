/************************************************************************************
 * Objetvo: Implementa a regra de negócio entre o app e a model
 * Autor: Kaue - MKVC
 * Data: 21/05/2023
 * Versão: 1.0
 ************************************************************************************/


const fotosDAO = require('../model/DAO/fotos_palestraDAO.js');

const message = require('./modulo/config.js')

//Função para retornar todos os itens da tabela recebidos da Model
const selecionarTodasAsFotos = async function() {


    //Solicita ao DAO todos as empresas do BD
    let dadosFotos = await fotosDAO.selectAllFotos()


    //Cria um objeto do tipo json
    let dadosJson = {}

    //Valida se BD teve registros
    if (dadosFotos) {
        //Adiciona o array de alunos em um JSON para retornar ao app
        dadosJson.status = 200
        dadosJson.count = dadosFotos.length
        dadosJson.Fotos = dadosFotos
        return dadosJson
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const buscarIdFotos = async function(id) {

    //Validação para o ID
    if (id == '' || id == undefined || isNaN(id))
        return message.ERROR_REQUIRED_ID
    else {
        //Solicita ao DAO todos os alunos do BD
        let dadosFotos = await fotosDAO.selectByIdFoto(id)

        //Cria um objeto do tipo json
        let dadosJson = {}

        //Valida se BD teve registros
        if (dadosFotos) {
            //Adiciona o array de alunos em um JSON para retornar ao app
            dadosJson.status = 200
            dadosJson.Url = dadosFotos
            return dadosJson
        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

const inserirFoto = async function(dadosFotos) {

    if (dadosFotos.foto == undefined || dadosFotos.foto == " " || dadosFotos.foto > 300 ||
        dadosFotos.id_palestra == undefined || dadosFotos.id_palestra == '' || isNaN(dadosFotos.id_palestra) ||
        dadosFotos.descricao == undefined || dadosFotos.descricao == "" || dadosFotos.descricao > 500
    ) {
        return message.ERROR_REQUIRED_DATA
    } else {
        //Envia os dados para a model a serem inseridos no BD
        let status = await fotosDAO.insertFoto(dadosFotos)

        if (status) {
            let dadosJson = {}

            let fotoNovoId = await fotosDAO.selectLastId()
            dadosFotos.id = fotoNovoId

            dadosJson.status = message.CREATED_ITEM.status
            dadosJson.Fotos = dadosFotos

            return dadosJson
        } else
            return message.ERROR_INTERNAL_SERVER

    }

}

const atualizarFotos = async function(dadosFotos, idFoto) {

    //Validação de dados
    if (dadosFotos.foto == undefined || dadosFotos.foto == "" || dadosFotos.foto > 300 ||
        dadosFotos.id_palestra == undefined || dadosFotos.id_palestra == '' || isNaN(dadosFotos.id_palestra) ||
        dadosFotos.descricao == undefined || dadosFotos.descricao == "" || dadosFotos.descricao > 500

    ) {
        return message.ERROR_REQUIRED_DATA

        //Validação para o id
    } else if (idFoto == '' || idFoto == undefined || isNaN(idFoto)) {
        return message.ERROR_REQUIRED_ID

    } else {

        let selectId = await fotosDAO.selectByIdFoto(idFoto)

        if (selectId == false) {
            return message.ERROR_NOT_FOUND_ID
        }
        //Adiciona o ID no JSON com todos os dados
        dadosFotos.id = idFoto


        //Encaminha para o DAO os dados para serem alterados
        let status = await fotosDAO.updateFoto(dadosFotos)


        if (status) {
            let dadosJson = {}
            dadosJson.status = message.UPDATED_ITEM.status
            dadosJson.Fotos = dadosFotos

            return dadosJson

        } else {
            return message.ERROR_INTERNAL_SERVER

        }
    }
}

const deletarFoto = async function(dadosFotos, id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_REQUIRED_ID
    } else {
        let status = await fotosDAO.deleteFoto(id)

        dadosFotos.id = id

        if (status) {
            return message.DELETED_ITEM
        } else {
            return message.ERROR_INTERNAL_SERVER

        }
    }

}

module.exports = {
    selecionarTodasAsFotos,
    buscarIdFotos,
    inserirFoto,
    atualizarFotos,
    deletarFoto
}