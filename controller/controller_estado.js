/************************************************************************************
 * Objetvo: Implementa a regra de negócio entre o app e a model
 * Autores: Cleiton / MKVC
 * Data: 20/05/2023
 * Versão: 1.0
 ************************************************************************************/

//Import do arquivo de acesso ao BD
const estadoDAO = require('../model/DAO/estadoDAO.js')

//Import do arquivo de glodal de configurações do projeto
const message = require('./modulo/config.js')

//Função para retornar todos os itens da tabela recebidos da Model
const selecionarTodosEstados = async function(sigla = 0) {

    let dadosEstado
    let siglaEstado = sigla
    let listaComidaRepetimento = []
    let listaBiomaRepetimento = []
    let listaBioma = []
    let listaComida = []


    //Validação para saber se a sigla foi passada
    if (siglaEstado == 0) {
        //Solicita a controller que retorne todos os estados do BD
        dadosEstado = await estadoDAO.selectAllEstados()

    } else {
        //Solicita a controller que retorne o estado da sigla informada
        dadosEstado = await estadoDAO.selectEstadoMapaBySigla(siglaEstado)
        console.log(dadosEstado);
    }
    dadosEstado.map(estado => {
        listaComidaRepetimento.push(estado.comida)
        listaBiomaRepetimento.push(estado.bioma)

    })

    //Função para remover o repetimento do array
    function removerPalavrasRepetidas(array) {
        let novoArray = [];
        array.forEach(function(palavra) {
            if (!novoArray.includes(palavra)) {
                novoArray.push(palavra);
            }
        });
        return novoArray;
    }

    listaBioma = removerPalavrasRepetidas(listaBiomaRepetimento)
    listaComida = removerPalavrasRepetidas(listaComidaRepetimento)

    let jsonMapa = { estado: dadosEstado[0].estado, regiao: dadosEstado[0].regiao, bioma: listaBioma, comida: listaComida, descricao: dadosEstado[0].descricao }
    let dadosJson = {}

    //Valida se BD teve registros
    if (dadosEstado) {
        //Adiciona o array de alunos em um JSON para retornar ao app
        dadosJson.status = 200

        if (jsonMapa.estado != undefined) {
            dadosJson.estado = jsonMapa
        } else {
            dadosJson.count = dadosEstado.length
            dadosJson.estados = dadosEstado
        }

        return dadosJson
    } else {
        return message.ERROR_NOT_FOUND
    }

}

//Função para buscar um item filtrado pelo ID, que será encaminhado pela Model
const buscarIdEstado = async function(id) {

    //Validação para o ID
    if (id == '' || id == undefined || isNaN(id))
        return message.ERROR_REQUIRED_ID
    else {
        //Solicita ao DAO todos os alunos do BD
        let dadosEstados = await estadoDAO.selectEstadoById(id)

        //Cria um objeto do tipo json
        let dadosJson = {}

        //Valida se BD teve registros
        if (dadosEstados) {
            //Adiciona o array de alunos em um JSON para retornar ao app
            dadosJson.status = 200
            dadosJson.estado = dadosEstados
            return dadosJson
        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

//Função para receber os dados do APP e enviar para a Model para inderir um novo item
const inserirEstado = async function(dadosEstado) {


    if (dadosEstado.nome == undefined || dadosEstado.nome == '' || dadosEstado.nome.length > 100 ||
        dadosEstado.sigla == undefined || dadosEstado.sigla == '' || dadosEstado.sigla.length > 10) {
        return message.ERROR_REQUIRED_DATA
    } else {
        //Envia os dados para a model a serem inseridos no BD
        let status = await estadoDAO.insertEstado(dadosEstado)

        if (status) {
            let dadosJson = {}

            let estadoNovoId = await estadoDAO.selectLastId()
            dadosEstado.id = estadoNovoId

            dadosJson.status = message.CREATED_ITEM.status
            dadosJson.estado = dadosEstado

            return dadosJson
        } else
            return message.ERROR_INTERNAL_SERVER

    }

}

//Função para receber os dados do APP e enviar para a Model para atualizar um item existente
const atualizarEstado = async function(dadosEstado, idEstado) {

    //Validação de dados
    if (dadosEstado.nome == undefined || dadosEstado.nome == '' || dadosEstado.nome.length > 100 ||
        dadosEstado.sigla == undefined || dadosEstado.sigla == '' || dadosEstado.sigla.length > 10) {
        return message.ERROR_REQUIRED_DATA

        //Validação para o id
    } else if (idEstado == '' || idEstado == undefined || isNaN(idEstado)) {
        return message.ERROR_REQUIRED_ID

    } else {

        //Validação para ver se o registro passado existe no bd
        let selectID = await estadoDAO.selectEstadoById(idEstado)

        if (selectID == false)
            return message.ERROR_NOT_FOUND_ID
                //Adiciona o ID no JSON com todos os dados
        dadosEstado.id = idEstado


        //Encaminha para o DAO os dados para serem alterados
        let status = await estadoDAO.updateEstado(dadosEstado)

        if (status) {
            let dadosJson = {}
            dadosJson.status = message.UPDATED_ITEM.status
            dadosJson.estado = dadosEstado

            return dadosJson

        } else {
            return message.ERROR_INTERNAL_SERVER

        }
    }
}

//Função para excluir um aluno filtrado pelo ID, será encaminhado para a Model
const deletarEstado = async function(dadosEstado, id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_REQUIRED_ID
    } else {
        dadosEstado.id = id
        let status = await estadoDAO.deleteEstado(id)

        if (status) {
            return message.DELETED_ITEM
        } else {
            return message.ERROR_INTERNAL_SERVER

        }
    }

}

module.exports = {
    selecionarTodosEstados,
    buscarIdEstado,
    inserirEstado,
    atualizarEstado,
    deletarEstado
}