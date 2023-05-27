/************************************************************************************
 * Objetvo: Implementa a regra de negócio entre o app e a model
 * Autores: Cleiton / MKVC
 * Data: 21/05/2023
 * Versão: 1.0
 ************************************************************************************/

//Import do arquivo de acesso ao BD
const escolaDAO = require('../model/DAO/escolaDAO.js')
const enderecoDAO = require('../model/DAO/enderecoDAO.js')

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
const message = require('./modulo/config.js')

//Função para retornar todos os itens da tabela recebidos da Model
const selecionarTodasEscolas = async function() {

    //Solicita ao DAO todas as cidades do BD
    let dadosEscola = await escolaDAO.selectAllEscola()
        //Cria um objeto do tipo json
    let dadosJson = {}

    //Valida se BD teve registros
    if (dadosEscola) {
        //Adiciona o array de alunos em um JSON para retornar ao app
        dadosJson.status = 200
        dadosJson.count = dadosEscola.length
        dadosJson.escola = dadosEscola
        return dadosJson
    } else {
        return message.ERROR_NOT_FOUND
    }

}

//Função para buscar um item filtrado pelo ID, que será encaminhado pela Model
const buscarIdEscola = async function(id) {

    //Validação para o ID
    if (id == '' || id == undefined || isNaN(id))
        return message.ERROR_REQUIRED_ID
    else {
        //Solicita ao DAO todos os alunos do BD
        let dadosEscola = await escolaDAO.selectEscolaById(id)

        //Cria um objeto do tipo json
        let dadosJson = {}

        //Valida se BD teve registros
        if (dadosEscola) {
            //Adiciona o array de cidades em um JSON para retornar ao app
            dadosJson.status = 200
            dadosJson.escola = dadosEscola
            return dadosJson
        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

//Função para receber os dados do APP e enviar para a Model para inderir um novo item
const inserirEscola = async function(dadosEscola) {


    //Validação dos dados
    if (dadosEscola.nome == undefined || dadosEscola.nome == '' || dadosEscola.nome.length > 100 ||
        dadosEscola.cnpj == undefined || dadosEscola.cnpj == '' || dadosEscola.cnpj.length > 30 ||
        dadosEscola.responsavel == undefined || dadosEscola.responsavel == '' || dadosEscola.responsavel.length > 100 ||
        dadosEscola.id_endereco == undefined || dadosEscola.id_endereco == '' || isNaN(dadosEscola.id_endereco)) {

        return message.ERROR_REQUIRED_DATA

    } else {


        

        //Recebe o id_endereco inserido no POST
        let FK_endereco = await enderecoDAO.selectEnderecoById(dadosEscola.id_endereco)
            //Valida se o id_endereco existe no BD
        if (FK_endereco == false)
            return message.ERROR_NOT_FOUND_FK

        let status = await escolaDAO.insertEscola(dadosEscola)

        if (status) {
            let dadosJson = {}

            let escolaNovoID = await escolaDAO.selectLastId()
            dadosEscola.id = escolaNovoID

            dadosJson.status = message.CREATED_ITEM.status
            dadosJson.escola = dadosEscola

            return dadosJson
        } else
            return message.ERROR_INTERNAL_SERVER
    }

}


//Função para receber os dados do APP e enviar para a Model para atualizar um item existente
const atualizarEscola = async function(dadosEscola, idEscola) {

    //Validação dos dados
    if (dadosEscola.nome == undefined || dadosEscola.nome == '' || dadosEscola.nome.length > 100 ||
        dadosEscola.cnpj == undefined || dadosEscola.cnpj == '' || dadosEscola.cnpj.length > 30 ||
        dadosEscola.responsavel == undefined || dadosEscola.responsavel == '' || dadosEscola.responsavel.length > 100 ||
        dadosEscola.id_endereco == undefined || dadosEscola.id_endereco == '' || isNaN(dadosEscola.id_endereco)) {

        return message.ERROR_REQUIRED_DATA

    } else if (idEscola == '' || idEscola == undefined || isNaN(idEscola)) {
        return message.ERROR_REQUIRED_ID

    } else {

        //Validação para ver se o registro passado existe no bd
        let selectID = await escolaDAO.selectEscolaById(idEscola)

        if (selectID == false)
            return message.ERROR_NOT_FOUND_ID

        //Recebe o id_endereco inserido no POST
        let FK_endereco = await enderecoDAO.selectEnderecoById(dadosEscola.id_endereco)
            //Valida se o id_endereco existe no BD
        if (FK_endereco == false)
            return message.ERROR_NOT_FOUND_FK

        //Adiciona o ID no JSON com todos os dados
        dadosEscola.id = idEscola
            //Encaminha para o DAO os dados para serem alterados
        let status = await escolaDAO.updateEscola(dadosEscola)

        if (status) {
            let dadosJson = {}
            dadosJson.status = message.UPDATED_ITEM.status
            dadosJson.escola = dadosEscola

            return dadosJson

        } else {
            return message.ERROR_INTERNAL_SERVER

        }


    }
}

//Função para excluir um aluno filtrado pelo ID, será encaminhado para a Model
const deletarEscola = async function(dadosEscola, id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_REQUIRED_ID
    } else {
        dadosEscola.id = id
        let status = await escolaDAO.deleteEscola(id)

        if (status) {
            return message.DELETED_ITEM
        } else {
            return message.ERROR_INTERNAL_SERVER

        }
    }

}

module.exports = {
    selecionarTodasEscolas,
    buscarIdEscola,
    inserirEscola,
    atualizarEscola,
    deletarEscola
}