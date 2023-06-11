/************************************************************************************
 * Objetvo: Implementa a regra de negócio entre o app e a model
 * Autor: Kaue - MKVC
 * Data: 21/05/2023
 * Versão: 1.0
 ************************************************************************************/


const videosDAO = require('../model/DAO/videoPalestraDAO.js');

const message = require('./modulo/config.js')

//Função para retornar todos os itens da tabela recebidos da Model
const selecionarTodosOsVideosPalestra = async function() {


    //Solicita ao DAO todos as empresas do BD
    let dadosVideos = await videosDAO.selectAllVideosPalestra()


    //Cria um objeto do tipo json
    let dadosJson = {}

    //Valida se BD teve registros
    if (dadosVideos) {
        //Adiciona o array de alunos em um JSON para retornar ao app
        dadosJson.status = 200
        dadosJson.count = dadosVideos.length
        dadosJson.videos = dadosVideos
        return dadosJson
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const buscarIdVideo = async function(id) {

    //Validação para o ID
    if (id == '' || id == undefined || isNaN(id))
        return message.ERROR_REQUIRED_ID
    else {
        //Solicita ao DAO todos os alunos do BD
        let dadosVideos = await videosDAO.selectByIdVideo(id)

        //Cria um objeto do tipo json
        let dadosJson = {}

        //Valida se BD teve registros
        if (dadosVideos) {
            //Adiciona o array de alunos em um JSON para retornar ao app
            dadosJson.status = 200
            dadosJson.Url = dadosVideos
            return dadosJson
        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

const inserirVideo = async function(dadosVideos) {

    if (dadosVideos.video == undefined || dadosVideos.videos == " " || dadosVideos.videos > 300 ||
        dadosVideos.id_palestra == undefined || dadosVideos.id_palestra == '' || isNaN(dadosVideos.id_palestra) ||
        dadosVideos.descricao == undefined || dadosVideos.descricao == "" || dadosVideos.descricao > 500
    ) {
        return message.ERROR_REQUIRED_DATA
    } else {
        //Envia os dados para a model a serem inseridos no BD
        let status = await videosDAO.insertVideoPalestra(dadosVideos)

        if (status) {
            let dadosJson = {}

            let videoNovoId = await videosDAO.selectLastId()
            dadosVideos.id = videoNovoId

            dadosJson.status = message.CREATED_ITEM.status
            dadosJson.video = dadosVideos

            return dadosJson
        } else
            return message.ERROR_INTERNAL_SERVER

    }

}

const atualizarVideos = async function(dadosVideos, idVideo) {

    //Validação de dados
    if (dadosVideos.video == undefined || dadosVideos.videos == " " || dadosVideos.videos > 300 ||
        dadosVideos.id_palestra == undefined || dadosVideos.id_palestra == '' || isNaN(dadosVideos.id_palestra) ||
        dadosVideos.descricao == undefined || dadosVideos.descricao == "" || dadosVideos.descricao > 500

    ) {
        return message.ERROR_REQUIRED_DATA

        //Validação para o id
    } else if (idVideo == '' || idVideo == undefined || isNaN(idVideo)) {
        return message.ERROR_REQUIRED_ID

    } else {

        let selectId = await videosDAO.selectByIdVideo(idVideo)

        if (selectId == false) {
            return message.ERROR_NOT_FOUND_ID
        }
        //Adiciona o ID no JSON com todos os dados
        dadosVideos.id = idVideo


        //Encaminha para o DAO os dados para serem alterados
        let status = await videosDAO.updateVideo(dadosVideos)


        if (status) {
            let dadosJson = {}
            dadosJson.status = message.UPDATED_ITEM.status
            dadosJson.video = dadosVideos

            return dadosJson

        } else {
            return message.ERROR_INTERNAL_SERVER

        }
    }
}

const deletarVideo = async function(dadosVideos, id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_REQUIRED_ID
    } else {
        let status = await videosDAO.deleteVideo(id)

        dadosVideos.id = id

        if (status) {
            return message.DELETED_ITEM
        } else {
            return message.ERROR_INTERNAL_SERVER

        }
    }

}

module.exports = {
    selecionarTodosOsVideosPalestra,
    buscarIdVideo,
    inserirVideo,
    atualizarVideos,
    deletarVideo
}