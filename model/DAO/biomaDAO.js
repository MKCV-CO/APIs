/************************************************************************************
 * Objetvo: Realizar a interação do bioma com o banco de dados
 * Autores: Cleiton / MKVC
 * Data: 20/05/2023
 * Versão: 1.0
 ************************************************************************************/

//Import da biblioteca do Prisma Client(Responsável por maniular dados no banco de dados)
const { PrismaClient } = require('@prisma/client')

//Intância da classe do prisma client
const prisma = new PrismaClient()

//Retorna o ultimo id criado
const selectLastId = async function() {

    //Script para retornar apenas o ultimo registro inserido na tabela
    let sql = `select id from tbl_bioma order by id desc limit 1;`

    let rsBioma = await prisma.$queryRawUnsafe(sql)

    if (rsBioma.length > 0)
        return rsBioma[0].id
    else
        return false
}

//Retorna todos os registros do Banco de Dados
const selectAllBiomas = async function() {

    let sql = 'select * from tbl_bioma'

    //Executa no banco de dados o scriptSQL
    //$queryRawUnsafe é utilizado quando o scriptSQL está em uma variável
    //$queryRaw é utilizado quando passar o script direto no métodos
    //Ex: $queryRaw('select * from tbl_bioma')
    let rsBioma = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (rsBioma.length > 0)
        return rsBioma
    else
        return false
}

//Retorna um bioma filtrado pelo id
const selectBiomaById = async function(id) {


    let sql = `select * from tbl_bioma where id = ${id}`

    let rsBioma = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (rsBioma.length > 0)
        return rsBioma
    else
        return false
}

//Inseri um novo registro no Banco de Dados
const insertBioma = async function(dadosBioma) {

    //Script sql para inserir os dados no BD
    let sql = `insert into tbl_bioma(nome)
        values
        (lower('${dadosBioma.nome}'))`

    //Executa o script sql no banco de dados e recebemos o retorno se deu certo ou não
    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
        return true
    else
        return false
}

//Modifica um bioma do banco de dados
const updateBioma = async function(dadosBioma) {
    let sql = `update tbl_bioma set
    nome= lower('${dadosBioma.nome}')
    where id = ${dadosBioma.id}`


    let result = await prisma.$queryRawUnsafe(sql)


    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false

}

//Deleta um registro do Banco de Dados
const deleteBioma = async function(id) {

    let sql = `delete from tbl_bioma where id=${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false


}

module.exports = {
    selectAllBiomas,
    selectBiomaById,
    insertBioma,
    selectLastId,
    updateBioma,
    deleteBioma
}