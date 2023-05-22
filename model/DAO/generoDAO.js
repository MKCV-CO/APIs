/************************************************************************************
 * Objetvo: Realizar a interação da genero com o banco de dados
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
    let sql = `select id from tbl_genero order by id desc limit 1;`

    let rsGenero = await prisma.$queryRawUnsafe(sql)

    if (rsGenero.length > 0)
        return rsGenero[0].id
    else
        return false
}

//Retorna todos os registros do Banco de Dados
const selectAllGenero = async function() {

    let sql = 'select * from tbl_genero'

    //Executa no banco de dados o scriptSQL
    //$queryRawUnsafe é utilizado quando o scriptSQL está em uma variável
    //$queryRaw é utilizado quando passar o script direto no métodos
    //Ex: $queryRaw('select * from tbl_genero')
    let rsGenero = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (rsGenero.length > 0)
        return rsGenero
    else
        return false
}

//Retorna um genero filtrado pelo id
const selectGeneroById = async function(id) {


    let sql = `select * from tbl_genero where id = ${id}`

    let rsGenero = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (rsGenero.length > 0)
        return rsGenero
    else
        return false
}

//Insere um novo registro no Banco de Dados
const insertGenero = async function(dadosGenero) {

    //Script sql para inserir os dados no BD
    let sql = `insert into tbl_genero(nome,sigla)
        values
        ('${dadosGenero.nome}',
        "${dadosGenero.sigla}")`

    //Executa o script sql no banco de dados e recebemos o retorno se deu certo ou não
    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
        return true
    else
        return false
}

//Modifica um registro do banco de dados
const updateGenero = async function(dadosGenero) {
    let sql = `update tbl_genero set
    nome='${dadosGenero.nome}',
    sigla='${dadosGenero.sigla}'
    where id = ${dadosGenero.id}`


    let result = await prisma.$queryRawUnsafe(sql)


    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false

}

//Deleta um registro do Banco de Dados
const deleteGenero = async function(id) {

    let sql = `delete from tbl_genero where id=${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false


}

module.exports = {
    selectAllGenero,
    selectGeneroById,
    insertGenero,
    selectLastId,
    updateGenero,
    deleteGenero
}