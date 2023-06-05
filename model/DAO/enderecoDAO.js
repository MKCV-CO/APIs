/************************************************************************************
 * Objetvo: Realizar a interação da endereco com o banco de dados
 * Autores: Cleiton
 * Data: 21/05/2023
 * Versão: 1.0
 ************************************************************************************/

//Import da biblioteca do Prisma Client(Responsável por maniular dados no banco de dados)
const { PrismaClient } = require('@prisma/client')

//Intância da classe do prisma client
const prisma = new PrismaClient()

//Retorna o ultimo id criado
const selectLastId = async function() {

    //Script para retornar apenas o ultimo registro inserido na tabela
    let sql = `select id from tbl_endereco order by id desc limit 1;`

    let rsEndereco = await prisma.$queryRawUnsafe(sql)

    if (rsEndereco.length > 0)
        return rsEndereco[0].id
    else
        return false
}

//Retorna todos os registros do Banco de Dados
const selectAllEndereco = async function() {

    let sql = 'select * from tbl_endereco'

    //Executa no banco de dados o scriptSQL
    //$queryRawUnsafe é utilizado quando o scriptSQL está em uma variável
    //$queryRaw é utilizado quando passar o script direto no métodos
    //Ex: $queryRaw('select * from tbl_endereco')
    let rsEndereco = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (rsEndereco.length > 0)
        return rsEndereco
    else
        return false
}

//Retorna todos os registros do Banco de Dados
const selectCidadeByName = async function(nome) {

    let sql = `select id from tbl_cidade where nome ="${nome}"`

    //Executa no banco de dados o scriptSQL
    //$queryRawUnsafe é utilizado quando o scriptSQL está em uma variável
    //$queryRaw é utilizado quando passar o script direto no métodos
    //Ex: $queryRaw('select * from tbl_endereco')
    let rsEndereco = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (rsEndereco.length > 0)
        return rsEndereco
    else
        return false
}

//Retorna um genero filtrado pelo id
const selectEnderecoById = async function(id) {


    let sql = `select * from vwEndereco where id_endereco = ${id}
    ;`

    let rsEndereco = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (rsEndereco.length > 0)
        return rsEndereco
    else
        return false
}
const selectEnderecoByIdVoluntario = async function(id) {


    let sql = `  select * from vwEnderecoVoluntario where id_voluntario = ${id}`

    let rsEndereco = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (rsEndereco.length > 0)
        return rsEndereco
    else
        return false
}
const selectEnderecoByIdEscola = async function(id) {


    let sql = `   select * from vwEnderecoEscola where id_escola = ${id};`

    let rsEndereco = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (rsEndereco.length > 0)
        return rsEndereco
    else
        return false
}

//Insere um novo registro no Banco de Dados
const insertEndereco = async function(dadosEndereco) {

    //Script sql para inserir os dados no BD
    let sql = `insert into tbl_endereco(
        logradouro,
        cep,
        numero,
        complemento,
        bairro,
        id_cidade)
        values
        ('${dadosEndereco.endereco.logradouro}',
        "${dadosEndereco.endereco.cep}",
        "${dadosEndereco.endereco.numero}",
        "${dadosEndereco.endereco.complemento}",
        "${dadosEndereco.endereco.bairro}",
        ${dadosEndereco.endereco.cidade}
        )`

    //Executa o script sql no banco de dados e recebemos o retorno se deu certo ou não
    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
        return true
    else
        return false
}

//Modifica um registro do banco de dados
const updateEndereco = async function(dadosEndereco) {
    let sql = `update tbl_endereco set
    logradouro='${dadosEndereco.endereco.logradouro}',
    cep=    '${dadosEndereco.endereco.cep}',
    numero= '${dadosEndereco.endereco.numero}',
    complemento = '${dadosEndereco.endereco.complemento}',
    bairro='${dadosEndereco.endereco.bairro}',
    id_cidade='${dadosEndereco.endereco.cidade}'
    where id = ${dadosEndereco.id}`
    let result = await prisma.$queryRawUnsafe(sql)


    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false

}

//Deleta um registro do Banco de Dados
const deleteEndereco = async function(id) {

    let sql = `delete from tbl_endereco where id=${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false


}

module.exports = {
    selectAllEndereco,
    selectEnderecoById,
    selectEnderecoByIdVoluntario,
    selectEnderecoByIdEscola,
    insertEndereco,
    selectLastId,
    updateEndereco,
    deleteEndereco,
    selectCidadeByName
}