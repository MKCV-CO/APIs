/************************************************************************************
 * Objetvo: Implementa a regra de negócio entre o app e a model
 * Autores: Cleiton / MKVC
 * Data: 20/05/2023
 * Versão: 1.0
 ************************************************************************************/

//Import do arquivo de acesso ao BD
const biomaDAO = require('../model/DAO/biomaDAO.js')

//Import do arquivo de glodal de configurações do projeto
const message = require('./modulo/config.js')

//Função para retornar todos os itens da tabela recebidos da Model
const selecionarTodosBiomas = async function() {

    //Solicita ao DAO todos os biomas do BD
    let dadosBiomas = await biomaDAO.selectAllBiomas()
        //Cria um objeto do tipo json
    let dadosJson = {}

    //Valida se BD teve registros
    if (dadosBiomas) {
        //Adiciona o array de alunos em um JSON para retornar ao app
        dadosJson.status = 200
        dadosJson.count = dadosBiomas.length
        dadosJson.Alunos = dadosBiomas
        return dadosJson
    } else {
        return message.ERROR_NOT_FOUND
    }

}

//Função para buscar um item filtrado pelo ID, que será encaminhado pela Model
const buscarIdBioma = async function(id) {

    //Validação para o ID
    if (id == '' || id == undefined || isNaN(id))
        return message.ERROR_REQUIRED_ID
    else {
        //Solicita ao DAO todos os alunos do BD
        let dadosBioma = await biomaDAO.selectBiomaById(id)

        //Cria um objeto do tipo json
        let dadosJson = {}

        //Valida se BD teve registros
        if (dadosBioma) {
            //Adiciona o array de alunos em um JSON para retornar ao app
            dadosJson.status = 200
            dadosJson.Bioma = dadosBioma
            return dadosJson
        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

//Função para receber os dados do APP e enviar para a Model para inderir um novo item
const inserirBioma = async function(dadosBioma) {


    if (dadosBioma.nome == undefined || dadosBioma.nome == '' || dadosBioma.nome.length > 100) {
        return message.ERROR_REQUIRED_DATA
    } else {
        //Envia os dados para a model a serem inseridos no BD
        let status = await biomaDAO.insertBioma(dadosBioma)

        if (status) {
            let dadosJson = {}

            let biomaNovoId = await biomaDAO.selectLastId()
            dadosBioma.id = biomaNovoId

            dadosJson.status = message.CREATED_ITEM.status
            dadosJson.bioma = dadosBioma

            return dadosJson
        } else
            return message.ERROR_INTERNAL_SERVER

    }

}

//Função para receber os dados do APP e enviar para a Model para atualizar um item existente
const atualizarBiomas = async function(dadosBioma, idBioma) {

    //Validação de dados
    if (dadosBioma.nome == undefined || dadosBioma.nome == '' || dadosBioma.nome.length > 100) {
        return message.ERROR_REQUIRED_DATA

        //Validação para o id
    } else if (idBioma == '' || idBioma == undefined || isNaN(idBioma)) {
        return message.ERROR_REQUIRED_ID

    } else {

        let selectID = await biomaDAO.selectBiomaById(idBioma)

        if (selectID == false)
            return message.ERROR_NOT_FOUND_ID
                //Adiciona o ID no JSON com todos os dados
        dadosBioma.id = idBioma


        //Encaminha para o DAO os dados para serem alterados
        let status = await biomaDAO.updateBioma(dadosBioma)

        if (status) {
            let dadosJson = {}
            dadosJson.status = message.UPDATED_ITEM.status
            dadosJson.bioma = dadosBioma

            return dadosJson

        } else {
            return message.ERROR_INTERNAL_SERVER

        }
    }
}

//Função para excluir um aluno filtrado pelo ID, será encaminhado para a Model
const deletarBiomas = async function(dadosBioma, id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_REQUIRED_ID
    } else {
        console.log(id);
        dadosBioma.id = id
        let status = await biomaDAO.deleteBioma(id)

        if (status) {
            return message.DELETED_ITEM
        } else {
            return message.ERROR_INTERNAL_SERVER

        }
    }

}

module.exports = {
    selecionarTodosBiomas,
    buscarIdBioma,
    inserirBioma,
    atualizarBiomas,
    deletarBiomas
}