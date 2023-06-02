/************************************************************************************
 * Objetvo: Realizar a interação da palestra com o banco de dados
 * Autores: Cleiton
 * Data: 31/05/2023
 * Versão: 1.0
 ************************************************************************************/

//Import da biblioteca do Prisma Client(Responsável por maniular dados no banco de dados)
const { PrismaClient } = require('@prisma/client')

//Intância da classe do prisma client
const prisma = new PrismaClient()

//Retorna o ultimo id criado
const selectLastId = async function() {

    //Script para retornar apenas o ultimo registro inserido na tabela
    let sql = `select id from tbl_palestra_empresa order by id desc limit 1;`

    let rsPalestra = await prisma.$queryRawUnsafe(sql)

    if (rsPalestra.length > 0)
        return rsPalestra[0].id
    else
        return false
}

//Retorna todos os registros do Banco de Dados
const selectAllPalestra_Empresa = async function() {

    let sql = 'select * from tbl_palestra_empresa'

    //Executa no banco de dados o scriptSQL
    //$queryRawUnsafe é utilizado quando o scriptSQL está em uma variável
    //$queryRaw é utilizado quando passar o script direto no métodos
    //Ex: $queryRaw('select * from tbl_palestra')
    let rsPalestra = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (rsPalestra.length > 0)
        return rsPalestra
    else
        return false
}

//Retorna um genero filtrado pelo id
const selectPalestra_EmpresaById = async function(id) {


    let sql = `select * from tbl_palestra_empresa where id = ${id}`

    let rsPalestra = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (rsPalestra.length > 0)
        return rsPalestra
    else
        return false
}

//Insere um novo registro no Banco de Dados
const insertPalestra_Empresa = async function(dadosPalestra) {

    //Script sql para inserir os dados no BD
    let sql = `insert into tbl_palestra_empresa(id_palestra,id_empresa)
        values
        ('${dadosPalestra.id_palestra}',
        "${dadosPalestra.id_empresa}")`

    //Executa o script sql no banco de dados e recebemos o retorno se deu certo ou não
    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
        return true
    else
        return false
}

//Modifica um registro do banco de dados
const updatePalestra_Empresa = async function(dadosPalestra) {
    let sql = `update tbl_palestra_empresa set
    id_palestra='${dadosPalestra.id_palestra}',
    id_empresa='${dadosPalestra.id_empresa}'
    where id = ${dadosPalestra.id}`

    let result = await prisma.$queryRawUnsafe(sql)


    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false

}

//Deleta um registro do Banco de Dados
const deletePalestra_Empresa = async function(id) {

    let sql = `delete from tbl_palestra_empresa where id=${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false


}

module.exports = {
    selectAllPalestra_Empresa,
    selectPalestra_EmpresaById,
    insertPalestra_Empresa,
    selectLastId,
    updatePalestra_Empresa,
    deletePalestra_Empresa
}