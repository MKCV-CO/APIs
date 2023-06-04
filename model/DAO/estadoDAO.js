/************************************************************************************
 * Objetvo: Realizar a interação do estado com o banco de dados
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
    let sql = `select id from tbl_estado order by id desc limit 1;`

    let rsEstado = await prisma.$queryRawUnsafe(sql)

    if (rsEstado.length > 0)
        return rsEstado[0].id
    else
        return false
}

//Retorna todos os registros do Banco de Dados
const selectAllEstados = async function() {

    let sql = 'select * from tbl_estado'

    //Executa no banco de dados o scriptSQL
    //$queryRawUnsafe é utilizado quando o scriptSQL está em uma variável
    //$queryRaw é utilizado quando passar o script direto no métodos
    //Ex: $queryRaw('select * from tbl_bioma')
    let rsEstado = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (rsEstado.length > 0)
        return rsEstado
    else
        return false
}

//Retorna um bioma filtrado pelo id
const selectEstadoById = async function(id) {


    let sql = `select * from tbl_estado where id = ${id}`

    let rsEstado = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (rsEstado.length > 0)
        return rsEstado
    else
        return false
}

//Retorna um bioma filtrado pelo id
const selectEstadoBySigla = async function(sigla) {


    let sql = `select id from tbl_estado where sigla = "${sigla}"`

    let rsEstado = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (rsEstado.length > 0)
        return rsEstado
    else
        return false
}
const selectEstadoMapaBySigla = async function(sigla) {

    let sql = `select tbl_estado.nome as estado, tbl_estado.regiao as regiao,
    tbl_bioma.nome as bioma,
    tbl_descricao.descricao,
    tbl_comida.nome as comida
from tbl_estado
     inner join tbl_estado_bioma
         on tbl_estado.id = tbl_estado_bioma.id_estado
     inner join tbl_bioma
         on tbl_bioma.id = tbl_estado_bioma.id_bioma
     inner join tbl_descricao
         on tbl_estado.id = tbl_descricao.id_estado
     inner join tbl_comida
         on tbl_estado.id = tbl_comida.id_estado
         where tbl_estado.sigla = "${sigla}"`

    let rsEstado = await prisma.$queryRawUnsafe(sql)


    //Valida se o banco de dados retonou algum registro
    if (rsEstado.length > 0)
        return rsEstado
    else
        return false
}

//Inseri um novo registro no Banco de Dados
const insertEstado = async function(dadosEstado) {

    //Script sql para inserir os dados no BD
    let sql = `insert into tbl_estado(nome,sigla,regiao)
        values
        ('${dadosEstado.nome}',
        '${dadosEstado.sigla}',
        "${dadosEstado.regiao}")`

    //Executa o script sql no banco de dados e recebemos o retorno se deu certo ou não
    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
        return true
    else
        return false
}

//Modifica um registro do banco de dados
const updateEstado = async function(dadosEstado) {
    let sql = `update tbl_estado set
    nome='${dadosEstado.nome}',
    sigla='${dadosEstado.sigla}'
    where id = ${dadosEstado.id}`


    let result = await prisma.$queryRawUnsafe(sql)


    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false

}

//Deleta um registro do Banco de Dados
const deleteEstado = async function(id) {

    let sql = `delete from tbl_estado where id=${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false


}

module.exports = {
    selectAllEstados,
    selectEstadoById,
    insertEstado,
    selectLastId,
    updateEstado,
    deleteEstado,
    selectEstadoBySigla,
    selectEstadoMapaBySigla
}