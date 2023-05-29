/************************************************************************************
 * Objetvo: Realizar a interação da escola-palestra com o banco de dados
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
    let sql = `select id from tbl_escola_palestra order by id desc limit 1;`

    let rsEscolaPalestra = await prisma.$queryRawUnsafe(sql)

    if (rsEscolaPalestra.length > 0)
        return rsEscolaPalestra[0].id
    else
        return false
}

//Retorna todos os registros do Banco de Dados
const selectAllEscolaPalestra = async function() {

    let sql = 'select * from tbl_escola_palestra'

    //Executa no banco de dados o scriptSQL
    //$queryRawUnsafe é utilizado quando o scriptSQL está em uma variável
    //$queryRaw é utilizado quando passar o script direto no métodos
    //Ex: $queryRaw('select * from tbl_escola_palestra')
    let rsEscolaPalestra = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (rsEscolaPalestra.length > 0)
        return rsEscolaPalestra
    else
        return false
}

//Retorna um escola-palestra filtrado pelo id
const selectEscolaPalestraById = async function(id) {


    let sql = `select * from tbl_escola_palestra where id = ${id}`

    let rsEscolaPalestra = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (rsEscolaPalestra.length > 0)
        return rsEscolaPalestra
    else
        return false
}

//Insere um novo registro no Banco de Dados
const insertEscolaPalestra = async function(dadosEscolaPalestra) {

    //Script sql para inserir os dados no BD
    let sql = `insert into tbl_escola_palestra(id_escola, id_palestra)
        values
        ('${dadosEscolaPalestra.id_escola}',
        ${dadosEscolaPalestra.id_palestra}
        )`

    //Executa o script sql no banco de dados e recebemos o retorno se deu certo ou não
    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
        return true
    else
        return false
}

//Modifica um registro do banco de dados
const updateEscolaPalestra = async function(dadosEscolaPalestra) {
    let sql = `update tbl_escola_palestra set
    id_escola='${dadosEscolaPalestra.id_escola}',
    id_palestra='${dadosEscolaPalestra.id_palestra}'
    where id = ${dadosEscolaPalestra.id}`


    let result = await prisma.$queryRawUnsafe(sql)


    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false

}

//Deleta um registro do Banco de Dados
const deleteEscolaPalestra = async function(id) {

    let sql = `delete from tbl_escola_palestra where id=${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false


}

module.exports = {
    selectAllEscolaPalestra,
    selectEscolaPalestraById,
    insertEscolaPalestra,
    selectLastId,
    updateEscolaPalestra,
    deleteEscolaPalestra
}