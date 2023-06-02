/************************************************************************************
 * Objetvo: Implementa a regra de negócio entre o app e a model
 * Autores: Cleiton / MKVC
 * Data: 21/05/2023
 * Versão: 1.0
 ************************************************************************************/

//Import do arquivo de acesso ao BD
const escolaDAO = require('../model/DAO/escolaDAO.js')
const enderecoDAO = require('../model/DAO/enderecoDAO.js')
const controllerEndereco = require('./controller_endereco.js')

//Import do arquivo de glodal de configurações do projeto
const message = require('./modulo/config.js')

//Função para retornar todos os itens da tabela recebidos da Model
const selecionarTodasEscolas = async function() {

    //Solicita ao DAO todas as cidades do BD
    let dadosEscola = await escolaDAO.selectAllEscola()
        //Cria um objeto do tipo json
    let dadosAcumuladosJson = {}
    let dadosLista = []

    //Valida se BD teve registros
    if (dadosEscola) {
        //Adiciona o array de alunos em um JSON para retornar ao app
        dadosAcumuladosJson.status = 200
        dadosAcumuladosJson.count = dadosEscola.length

        let i = 0
        while (i < dadosEscola.length) {

            let endereco = await enderecoDAO.selectEnderecoByIdEscola(dadosEscola[i].id)

            dadosLista.push({ "escola": dadosEscola[i], endereco })
            i++
        }


        dadosAcumuladosJson.dadosEscolas = dadosLista
        return dadosAcumuladosJson
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
        let dadosAcumuladosJson = {}

        //Valida se BD teve registros
        if (dadosEscola) {
            //Adiciona o array de alunos em um JSON para retornar ao app
            dadosAcumuladosJson.status = 200
            dadosAcumuladosJson.count = dadosEscola.length

            let endereco = await enderecoDAO.selectEnderecoByIdEscola(dadosEscola[0].id)
            let escola = dadosEscola

            dadosAcumuladosJson.dados = { escola, endereco }
            return dadosAcumuladosJson
        } else {
            return message.ERROR_NOT_FOUND

        }
    }
}
const buscarNomeEscola = async function(nome) {



    //Validação para o ID
    if (nome == '' || nome == undefined)
        return message.ERROR_REQUIRED_ID
    else {
        //Solicita ao DAO todos os alunos do BD
        let dadosEscola = await escolaDAO.selectEscolaByNome(nome)

        //Cria um objeto do tipo json
        let dadosAcumuladosJson = {}

        //Valida se BD teve registros
        if (dadosEscola) {
            //Adiciona o array de alunos em um JSON para retornar ao app
            dadosAcumuladosJson.status = 200
            dadosAcumuladosJson.count = dadosEscola.length

            let endereco = await enderecoDAO.selectEnderecoByIdEscola(dadosEscola[0].id)
            let escola = dadosEscola

            dadosAcumuladosJson.dados = { escola }
            return dadosAcumuladosJson
        } else {
            return message.ERROR_NOT_FOUND

        }
    }
}

//Função para receber os dados do APP e enviar para a Model para inderir um novo item
const inserirEscola = async function(dadosEscola) {


    //Validação dos dados
    if (dadosEscola.escola.nome == undefined || dadosEscola.escola.nome == '' || dadosEscola.escola.nome.length > 100 ||
        dadosEscola.escola.cnpj == undefined || dadosEscola.escola.cnpj == '' || dadosEscola.escola.cnpj.length > 30 ||
        dadosEscola.escola.email == undefined || dadosEscola.escola.email == '' || dadosEscola.escola.email.length > 255 ||
        dadosEscola.escola.telefone == undefined || dadosEscola.escola.telefone == '' || dadosEscola.escola.telefone.length > 15 ||
        dadosEscola.endereco.logradouro == undefined || dadosEscola.endereco.logradouro == '' || dadosEscola.endereco.logradouro.length > 100 ||
        dadosEscola.endereco.cep == undefined || dadosEscola.endereco.cep == '' || dadosEscola.endereco.cep.length > 10 ||
        dadosEscola.endereco.numero == undefined || dadosEscola.endereco.numero == '' || dadosEscola.endereco.numero.length > 10 ||
        dadosEscola.endereco.complemento == undefined || dadosEscola.endereco.complemento == '' || dadosEscola.endereco.complemento.length > 15 ||
        dadosEscola.endereco.bairro == undefined || dadosEscola.endereco.bairro == '' || dadosEscola.endereco.bairro.length > 50 ||
        dadosEscola.endereco.cidade == undefined || dadosEscola.endereco.cidade == '' ||
        dadosEscola.endereco.estado == undefined || dadosEscola.endereco.estado == '' ||
        dadosEscola.escola.responsavel == undefined || dadosEscola.escola.responsavel == '' || dadosEscola.escola.responsavel.length > 100) {

        return message.ERROR_REQUIRED_DATA

    } else {
        let endereco = await controllerEndereco.inserirEndereco(dadosEscola)

        if (endereco) {
            let selectEndereco = await enderecoDAO.selectLastId()

            dadosEscola.escola.id_endereco = selectEndereco
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
        } else
            return message.ERROR_REQUIRED_DATA


    }

}


//Função para receber os dados do APP e enviar para a Model para atualizar um item existente
const atualizarEscola = async function(dadosEscola, idEscola) {

    //Validação dos dados
    if (dadosEscola.escola.nome == undefined || dadosEscola.escola.nome == '' || dadosEscola.escola.nome.length > 100 ||
        dadosEscola.escola.cnpj == undefined || dadosEscola.escola.cnpj == '' || dadosEscola.escola.cnpj.length > 30 ||
        dadosEscola.escola.email == undefined || dadosEscola.escola.email == '' || dadosEscola.escola.email.length > 255 ||
        dadosEscola.escola.telefone == undefined || dadosEscola.escola.telefone == '' || dadosEscola.escola.telefone.length > 15 ||
        dadosEscola.escola.responsavel == undefined || dadosEscola.escola.responsavel == '' || dadosEscola.escola.responsavel.length > 100) {

        return message.ERROR_REQUIRED_DATA

    } else if (idEscola == '' || idEscola == undefined || isNaN(idEscola)) {
        return message.ERROR_REQUIRED_ID

    } else {

        //Validação para ver se o registro passado existe no bd
        let selectID = await escolaDAO.selectEscolaById(idEscola)

        if (selectID == false)
            return message.ERROR_NOT_FOUND_ID

        console.log(dadosEscola);
        console.log(dadosEscola.endereco.id_endereco);
        let endereco = await controllerEndereco.atualizarEndereco(dadosEscola, dadosEscola.endereco.id_endereco)
        console.log(endereco);
        //Adiciona o ID no JSON com todos os dados
        dadosEscola.escola.id = idEscola
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

        let escola = await enderecoDAO.selectEnderecoByIdEscola(id)

        let status = await escolaDAO.deleteEscola(id)
        let endereco = await enderecoDAO.deleteEndereco(escola[0].id_endereco)


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
    deletarEscola,
    buscarNomeEscola
}