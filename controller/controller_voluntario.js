/************************************************************************************
 * Objetvo: Implementa a regra de negócio entre o app e a model
 * Autores: Cleiton / MKVC
 * Data: 21/05/2023
 * Versão: 1.0
 ************************************************************************************/

//Import do arquivo de acesso ao BD
const voluntarioDAO = require('../model/DAO/voluntarioDAO.js')
const enderecoDAO = require('../model/DAO/enderecoDAO.js')
const generoDAO = require('../model/DAO/generoDAO.js')

const controllerEndereco = require('./controller_endereco.js')

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
const selecionarTodosVoluntarios = async function() {

    //Solicita ao DAO todas as cidades do BD
    let dadosVoluntarios = await voluntarioDAO.selectAllVoluntario()
        //Cria um objeto do tipo json
    let dadosAcumuladosJson = {}
    let dadosLista = []

    //Valida se BD teve registros
    if (dadosVoluntarios) {
        //Adiciona o array de alunos em um JSON para retornar ao app
        dadosAcumuladosJson.status = 200
        dadosAcumuladosJson.count = dadosVoluntarios.length

        let i = 0
        while (i < dadosVoluntarios.length) {

            let genero = await generoDAO.selectGeneroById(dadosVoluntarios[i].id)
            let endereco = await enderecoDAO.selectEnderecoById(dadosVoluntarios[i].id)

            dadosLista.push({ "voluntario": dadosVoluntarios[i], genero, endereco })
            i++
        }


        dadosAcumuladosJson.dadosVoluntarios = dadosLista
        return dadosAcumuladosJson
    } else {
        return message.ERROR_NOT_FOUND
    }

}

//Função para buscar um item filtrado pelo ID, que será encaminhado pela Model
const buscarIdVoluntario = async function(id) {

    //Validação para o ID
    if (id == '' || id == undefined || isNaN(id))
        return message.ERROR_REQUIRED_ID
    else {
        //Solicita ao DAO todos os alunos do BD
        let dadosVoluntario = await voluntarioDAO.selectVoluntarioById(id)

        let dadosAcumuladosJson = {}
        let dadosLista = []

        //Valida se BD teve registros
        if (dadosVoluntario) {
            //Adiciona o array de alunos em um JSON para retornar ao app
            dadosAcumuladosJson.status = 200
            dadosAcumuladosJson.count = dadosVoluntario.length

            let genero = await generoDAO.selectGeneroById(dadosVoluntario[0].id)
            let endereco = await enderecoDAO.selectEnderecoById(dadosVoluntario[0].id)
            let voluntario = dadosVoluntario

            dadosAcumuladosJson.dados = { voluntario, genero, endereco }
            return dadosAcumuladosJson
        } else {
            return message.ERROR_NOT_FOUND

        }
    }

}

//Função para receber os dados do APP e enviar para a Model para inderir um novo item
const inserirVoluntario = async function(dadosVoluntario) {


    // Validação dos dados
    if (dadosVoluntario.voluntario.nome == undefined || dadosVoluntario.voluntario.nome == '' || dadosVoluntario.voluntario.nome.length > 150 ||
        dadosVoluntario.voluntario.cpf == undefined || dadosVoluntario.voluntario.cpf == '' || dadosVoluntario.voluntario.cpf.length > 18 ||
        dadosVoluntario.voluntario.rg == undefined || dadosVoluntario.voluntario.rg == '' || dadosVoluntario.voluntario.rg.length > 18 ||
        dadosVoluntario.voluntario.email == undefined || dadosVoluntario.voluntario.email == '' || dadosVoluntario.voluntario.email.length > 150 ||
        dadosVoluntario.voluntario.telefone == undefined || dadosVoluntario.voluntario.telefone == '' || dadosVoluntario.voluntario.telefone.length > 25 ||
        dadosVoluntario.voluntario.contribuicao == undefined || dadosVoluntario.voluntario.contribuicao == '' ||
        dadosVoluntario.voluntario.foto_rg == undefined || dadosVoluntario.voluntario.foto_rg == '' || dadosVoluntario.voluntario.foto_rg.length > 300 ||
        dadosVoluntario.voluntario.foto_diploma == undefined || dadosVoluntario.voluntario.foto_diploma == '' || dadosVoluntario.voluntario.foto_diploma.length > 300 ||
        dadosVoluntario.voluntario.id_genero == undefined || dadosVoluntario.voluntario.id_genero == '' || isNaN(dadosVoluntario.voluntario.id_genero) ||
        dadosVoluntario.voluntario.id_estado_civil == undefined || dadosVoluntario.voluntario.id_estado_civil == '' || isNaN(dadosVoluntario.voluntario.id_estado_civil)) {

        return message.ERROR_REQUIRED_DATA

        //Validação da data
    } else if (dadosVoluntario.voluntario.data_nascimento == undefined || dadosVoluntario.voluntario.data_nascimento == '' || validarDataMySQL(dadosVoluntario.voluntario.data_nascimento) == false) {
        return message.ERROR_INVALID_DATE_FORMAT
    } else {


        controllerEndereco.inserirEndereco(dadosVoluntario)
        let selectEndereco = await enderecoDAO.selectLastId()

        dadosVoluntario.voluntario.id_endereco = selectEndereco
        let status = await voluntarioDAO.insertVoluntario(dadosVoluntario)

        if (status) {
            let dadosJson = {}

            let voluntarioNovoId = await voluntarioDAO.selectLastId()
            dadosVoluntario.id = voluntarioNovoId

            dadosJson.status = message.CREATED_ITEM.status
            dadosJson.voluntario = dadosVoluntario

            return dadosJson
        } else
            return message.ERROR_INTERNAL_SERVER
    }

}


//Função para receber os dados do APP e enviar para a Model para atualizar um item existente
const atualizarVoluntario = async function(dadosVoluntario, idVoluntario) {

    //Validação dos dados
    if (dadosVoluntario.voluntario.nome == undefined || dadosVoluntario.voluntario.nome == '' || dadosVoluntario.voluntario.nome.length > 150 ||
        dadosVoluntario.voluntario.cpf == undefined || dadosVoluntario.voluntario.cpf == '' || dadosVoluntario.voluntario.cpf.length > 18 ||
        dadosVoluntario.voluntario.rg == undefined || dadosVoluntario.voluntario.rg == '' || dadosVoluntario.voluntario.rg.length > 18 ||
        dadosVoluntario.voluntario.email == undefined || dadosVoluntario.voluntario.email == '' || dadosVoluntario.voluntario.email.length > 150 ||
        dadosVoluntario.voluntario.telefone == undefined || dadosVoluntario.voluntario.telefone == '' || dadosVoluntario.voluntario.telefone.length > 25 ||
        dadosVoluntario.voluntario.contribuicao == undefined || dadosVoluntario.voluntario.contribuicao == '' ||
        dadosVoluntario.voluntario.foto_rg == undefined || dadosVoluntario.voluntario.foto_rg == '' || dadosVoluntario.voluntario.foto_rg.length > 300 ||
        dadosVoluntario.voluntario.foto_diploma == undefined || dadosVoluntario.voluntario.foto_diploma == '' || dadosVoluntario.voluntario.foto_diploma.length > 300 ||
        dadosVoluntario.voluntario.id_genero == undefined || dadosVoluntario.voluntario.id_genero == '' || isNaN(dadosVoluntario.voluntario.id_genero) ||
        dadosVoluntario.voluntario.id_estado_civil == undefined || dadosVoluntario.voluntario.id_estado_civil == '' || isNaN(dadosVoluntario.voluntario.id_estado_civil)) {

        return message.ERROR_REQUIRED_DATA

        //Validação da data
    } else if (dadosVoluntario.voluntario.data_nascimento == undefined || dadosVoluntario.voluntario.data_nascimento == '' || validarDataMySQL(dadosVoluntario.voluntario.data_nascimento) == false) {
        return message.ERROR_INVALID_DATE_FORMAT
    } else if (idVoluntario == '' || idVoluntario == undefined || isNaN(idVoluntario)) {
        return message.ERROR_REQUIRED_ID

    } else {

        //Validação para ver se o registro passado existe no bd
        let selectID = await voluntarioDAO.selectVoluntarioById(idVoluntario)

        if (selectID == false)
            return message.ERROR_NOT_FOUND_ID

        dadosVoluntario.voluntario.id = idVoluntario

        controllerEndereco.atualizarEndereco(dadosVoluntario, dadosVoluntario.endereco.id_endereco)

        //Encaminha para o DAO os dados para serem alterados
        let status = await voluntarioDAO.updateVoluntario(dadosVoluntario)

        if (status) {
            let dadosJson = {}
            dadosJson.status = message.UPDATED_ITEM.status
            dadosJson.voluntario = dadosVoluntario

            return dadosJson

        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

//Função para excluir um aluno filtrado pelo ID, será encaminhado para a Model
const deletarVoluntario = async function(dadosVoluntario, id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_REQUIRED_ID
    } else {
        dadosVoluntario.id = id

        let voluntario = await enderecoDAO.selectEnderecoById(id)

        console.log();

        let status = await voluntarioDAO.deleteVoluntario(id)
        let endereco = await enderecoDAO.deleteEndereco(voluntario[0].id_endereco)


        if (status) {
            return message.DELETED_ITEM
        } else {
            return message.ERROR_INTERNAL_SERVER

        }
    }

}

module.exports = {
    selecionarTodosVoluntarios,
    buscarIdVoluntario,
    inserirVoluntario,
    atualizarVoluntario,
    deletarVoluntario
}