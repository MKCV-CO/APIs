/************************************************************************************
 * Objetvo: Implementa a regra de negócio entre o app e a model
 * Autor: Kaue - MKVC
 * Data: 21/05/2023
 * Versão: 1.0
 ************************************************************************************/


const empresaDAO = require('../Model/DAO/empresaDAO.js');

const message = require('./modulo/config.js')

//Função para retornar todos os itens da tabela recebidos da Model
const selecionarTodasEmpresas = async function() {


    //Solicita ao DAO todos as empresas do BD
    let dadosEmpresa = await empresaDAO.selectAllEmpresas()

    
    //Cria um objeto do tipo json
    let dadosJson = {}

    //Valida se BD teve registros
    if (dadosEmpresa) {
        //Adiciona o array de alunos em um JSON para retornar ao app
        dadosJson.status = 200
        dadosJson.count = dadosEmpresa.length
        dadosJson.empresas = dadosEmpresa
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
        let dadosEmpresa = await empresaDAO.selectByIdEmpresa(id)

        //Cria um objeto do tipo json
        let dadosJson = {}

        //Valida se BD teve registros
        if (dadosEmpresa) {
            //Adiciona o array de alunos em um JSON para retornar ao app
            dadosJson.status = 200
            dadosJson.Empresas = dadosEmpresa
            return dadosJson
        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}
const buscarNomeEmpresa = async function(nome) {

    //Validação para o ID
    if (nome == '' || nome == undefined || nome > 50 )
        return message.ERROR_REQUIRED_ID
    else {
        //Solicita ao DAO todos os alunos do BD
        let dadosEmpresa = await empresaDAO.selectByNomeEmpresa(nome)

        //Cria um objeto do tipo json
        let dadosJson = {}

        //Valida se BD teve registros
        if (dadosEmpresa) {
            //Adiciona o array de alunos em um JSON para retornar ao app
            dadosJson.status = 200
            dadosJson.Empresas = dadosEmpresa
            return dadosJson
        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

const inserirEmpresa = async function(dadosEmpresa) {

    if (dadosEmpresa.nome_fantasia == undefined || dadosEmpresa.nome_fantasia == '' || dadosEmpresa.nome_fantasia.length > 150 ||
        dadosEmpresa.cnpj == undefined || dadosEmpresa.cnpj == ''|| dadosEmpresa.cnpj.length > 45 ||
        dadosEmpresa.razao_social == undefined || dadosEmpresa.razao_social == '' || dadosEmpresa.razao_social.length > 150 ||
        dadosEmpresa.logo == undefined || dadosEmpresa.logo == '' || dadosEmpresa.logo.length > 300
    ) {
        return message.ERROR_REQUIRED_DATA
    } else {
        //Envia os dados para a model a serem inseridos no BD
        let status = await empresaDAO.insertEmpresa(dadosEmpresa)

        if (status) {
            let dadosJson = {}

            let empresaNovoId = await empresaDAO.selectLastId()
            dadosEmpresa.id = empresaNovoId

            dadosJson.status = message.CREATED_ITEM.status
            dadosJson.empresa = dadosEmpresa

            return dadosJson
        } else
            return message.ERROR_INTERNAL_SERVER

    }

}

const atualizarEmpresa = async function(dadosEmpresa, idEmpresa) {

    //Validação de dados
    if (dadosEmpresa.nome_fantasia == undefined || dadosEmpresa.nome_fantasia == '' || dadosEmpresa.nome_fantasia.length > 150 ||
    dadosEmpresa.cnpj == undefined || dadosEmpresa.cnpj == ''|| dadosEmpresa.cnpj.length > 45 ||
    dadosEmpresa.razao_social == undefined || dadosEmpresa.razao_social == '' || dadosEmpresa.razao_social.length > 150 ||
    dadosEmpresa.logo == undefined || dadosEmpresa.logo == '' || dadosEmpresa.logo.length > 300
        
    ) {
        return message.ERROR_REQUIRED_DATA

        //Validação para o id
    } else if (idEmpresa == '' || idEmpresa == undefined || isNaN(idEmpresa)) {
        return message.ERROR_REQUIRED_ID

    } else {

        let selectId = await empresaDAO.selectByIdEmpresa(idEmpresa)

        if(selectId == false){
            return message.ERROR_NOT_FOUND_ID
        }
        //Adiciona o ID no JSON com todos os dados
        dadosEmpresa.id = idEmpresa


        //Encaminha para o DAO os dados para serem alterados
        let status = await empresaDAO.updateEmpresa(dadosEmpresa)


        if (status) {
            let dadosJson = {}
            dadosJson.status = message.UPDATED_ITEM.status
            dadosJson.empresa = dadosEmpresa

            return dadosJson

        } else {
            return message.ERROR_INTERNAL_SERVER

        }
    }
}

const deletarEmpresa = async function(dadosEmpresa, id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_REQUIRED_ID
    } else {
        let status = await empresaDAO.deleteEmpresa(id)

        dadosEmpresa.id = id

        if (status) {
            return message.DELETED_ITEM
        } else {
            return message.ERROR_INTERNAL_SERVER

        }
    }

}


module.exports = {
    selecionarTodasEmpresas,
    buscarIdEmpresa,
    inserirEmpresa,
    atualizarEmpresa,
    deletarEmpresa,
    buscarNomeEmpresa
    
}