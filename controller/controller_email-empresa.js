/************************************************************************************
 * Objetvo: Implementa a regra de negócio entre o app e a model
 * Autor: Kaue - MKVC
 * Data: 22/05/2023
 * Versão: 1.0
 ************************************************************************************/


const emailEmpresaDAO = require('../Model/DAO/email_empresaDAO.js');

const message = require('./modulo/config.js');
const email_empresaDAO = require('../Model/DAO/email_empresaDAO.js');

//Função para retornar todos os itens da tabela recebidos da Model
const selecionarTodosEmailsEmpresa = async function() {


    //Solicita ao DAO todos as empresas do BD
    let dadosEmailEmpresa = await emailEmpresaDAO.selectAllEmailsEmpresas()

    
    //Cria um objeto do tipo json
    let dadosJson = {}

    //Valida se BD teve registros
    if (dadosEmailEmpresa) {
        //Adiciona o array de alunos em um JSON para retornar ao app
        dadosJson.status = 200
        dadosJson.count = dadosEmailEmpresa.length
        dadosJson.Email_Empresas = dadosEmailEmpresa
        return dadosJson
    } else {
        return message.ERROR_NOT_FOUND
    }

}
const buscarIdEmpresa = async function(id) {

    //Validação para o ID
    if (id == '' || id == undefined || isNaN(id))
        return message.ERROR_REQUIRED_ID
    else {
        //Solicita ao DAO todos os alunos do BD
        let dadosEmailEmpresa = await emailEmpresaDAO.selectByIdEmpresa(id)

        //Cria um objeto do tipo json
        let dadosJson = {}

        //Valida se BD teve registros
        if (dadosEmailEmpresa) {
            //Adiciona o array de alunos em um JSON para retornar ao app
            dadosJson.status = 200
            dadosJson.Email = dadosEmailEmpresa
            return dadosJson
        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}
const buscarIdEmail = async function(id) {

    //Validação para o ID
    if (id == '' || id == undefined || isNaN(id))
        return message.ERROR_REQUIRED_ID
    else {
        //Solicita ao DAO todos os alunos do BD
        let dadosEmailEmpresa = await emailEmpresaDAO.selectByIdEmail(id)

        //Cria um objeto do tipo json
        let dadosJson = {}

        //Valida se BD teve registros
        if (dadosEmailEmpresa) {
            //Adiciona o array de alunos em um JSON para retornar ao app
            dadosJson.status = 200
            dadosJson.Email = dadosEmailEmpresa
            return dadosJson
        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}
const inserirEmail = async function(dadosEmailEmpresa) {

    if (dadosEmailEmpresa.email == undefined || dadosEmailEmpresa.email == '' || dadosEmailEmpresa.email.length > 255 ||
    dadosEmailEmpresa.id_empresa == undefined || dadosEmailEmpresa.id_empresa == ''      
    ) {
        return message.ERROR_REQUIRED_DATA
    } else {
        //Envia os dados para a model a serem inseridos no BD
        let status = await email_empresaDAO.insertEmail(dadosEmailEmpresa)

        if (status) {
            let dadosJson = {}

            let emailNovoId = await emailEmpresaDAO.selectLastId()
            dadosEmailEmpresa.id = emailNovoId

            dadosJson.status = message.CREATED_ITEM.status
            dadosJson.empresa = dadosEmailEmpresa

            return dadosJson
        } else
            return message.ERROR_INTERNAL_SERVER

    }

}
const atualizarEmailEmpresa = async function(dadosEmail, idEmail) {

    //Validação de dados
    if (dadosEmail.email == undefined || dadosEmail.email == '' || dadosEmail.email.length > 255  ||
        dadosEmail.id_empresa == undefined || dadosEmail.id_empresa == ''   
    ) {
        return message.ERROR_REQUIRED_DATA

        //Validação para o id
    } else if (idEmail == '' || idEmail == undefined || isNaN(idEmail)) {
        return message.ERROR_REQUIRED_ID

    } else {

        let selectId = await email_empresaDAO.selectByIdEmail(idEmail)
        if(selectId == false){
            return message.ERROR_NOT_FOUND_ID
        }
        //Adiciona o ID no JSON com todos os dados
        dadosEmail.id = idEmail
        //Encaminha para o DAO os dados para serem alterados
        let status = await email_empresaDAO.updateEmail(dadosEmail)

        if (status) {
            let dadosJson = {}
            dadosJson.status = message.UPDATED_ITEM.status
            dadosJson.email = dadosEmail

            return dadosJson

        } else {
            return message.ERROR_INTERNAL_SERVER

        }
    }
}
const deletarEmpresa = async function(dadosEmail, id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_REQUIRED_ID
    } else {
        let status = await email_empresaDAO.deleteEmail(id)

        dadosEmail.id = id

        if (status) {
            return message.DELETED_ITEM
        } else {
            return message.ERROR_INTERNAL_SERVER

        }
    }

}

module.exports = {
    selecionarTodosEmailsEmpresa,
    buscarIdEmpresa,
    buscarIdEmail,
    inserirEmail,
    atualizarEmailEmpresa,
    deletarEmpresa
    
}
