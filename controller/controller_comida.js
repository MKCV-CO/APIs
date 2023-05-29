/************************************************************************************
 * Objetvo: Implementa a regra de negócio entre o app e a model
 * Autor: Kaue - MKVC
 * Data: 20/05/2023
 * Versão: 1.0
 ************************************************************************************/


const comidaDAO = require('../Model/DAO/comidaDAO.js');

const message = require('./modulo/config.js')

//Função para retornar todos os itens da tabela recebidos da Model
const selecionarTodasComidas = async function() {


    //Solicita ao DAO todos os alunos do BD
    let dadosComida = await comidaDAO.selectAllComidas()

    //Cria um objeto do tipo json
    let dadosJson = {}

    //Valida se BD teve registros
    if (dadosComida) {
        //Adiciona o array de alunos em um JSON para retornar ao app
        dadosJson.status = 200
        dadosJson.count = dadosComida.length
        dadosJson.comidas = dadosComida
        return dadosJson
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const buscarIdComida = async function(id) {

    //Validação para o ID
    if (id == '' || id == undefined || isNaN(id))
        return message.ERROR_REQUIRED_ID
    else {
        //Solicita ao DAO todos os alunos do BD
        let dadosComida = await comidaDAO.selectByIdComida(id)

        //Cria um objeto do tipo json
        let dadosJson = {}

        //Valida se BD teve registros
        if (dadosComida) {
            //Adiciona o array de alunos em um JSON para retornar ao app
            dadosJson.status = 200
            dadosJson.comidas = dadosComida
            return dadosJson
        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

const inserirComida = async function(dadosComida) {

    if (dadosComida.nome == undefined || dadosComida.nome == '' || dadosComida.nome.length > 100
    ) {
        return message.ERROR_REQUIRED_DATA
    } else {
        //Envia os dados para a model a serem inseridos no BD
        let status = await comidaDAO.insertComida(dadosComida)

        if (status) {
            let dadosJson = {}

            let comidaNovoId = await comidaDAO.selectLastId()
            dadosComida.id = comidaNovoId

            dadosJson.status = message.CREATED_ITEM.status
            dadosJson.comida = dadosComida

            return dadosJson
        } else
            return message.ERROR_INTERNAL_SERVER

    }

}

const atualizarComida = async function(dadosComida, idComida) {

    //Validação de dados
    if (dadosComida.nome == undefined || dadosComida.nome == '' || dadosComida.nome.length > 100 
        
    ) {
        return message.ERROR_REQUIRED_DATA

        //Validação para o id
    } else if (idComida == '' || idComida == undefined || isNaN(idComida)) {
        return message.ERROR_REQUIRED_ID

    } else {

        let selectId = await comidaDAO.selectByIdComida(idComida)

        if(selectId == false){
            return message.ERROR_NOT_FOUND_ID
        }
        //Adiciona o ID no JSON com todos os dados
        dadosComida.id = idComida


        //Encaminha para o DAO os dados para serem alterados
        let status = await comidaDAO.updateComida(dadosComida)


        if (status) {
            let dadosJson = {}
            dadosJson.status = message.UPDATED_ITEM.status
            dadosJson.aluno = dadosComida

            return dadosJson

        } else {
            return message.ERROR_INTERNAL_SERVER

        }
    }
}

const deletarComidas = async function(dadosComida, id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_REQUIRED_ID
    } else {
        let status = await comidaDAO.deleteComida(id)

        dadosComida.id = id

        if (status) {
            return message.DELETED_ITEM
        } else {
            return message.ERROR_INTERNAL_SERVER

        }
    }

}




module.exports = {
    selecionarTodasComidas,
    buscarIdComida,
    inserirComida,
    atualizarComida,
    deletarComidas
    
}