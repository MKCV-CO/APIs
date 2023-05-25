/************************************************************************************
 * Objetvo: Realizar a interação da cidade com o banco de dados
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
    let sql = `select id from tbl_cidade order by id desc limit 1;`

    let rsCidade = await prisma.$queryRawUnsafe(sql)

    if (rsCidade.length > 0)
        return rsCidade[0].id
    else
        return false
}

//Retorna todos os registros do Banco de Dados
const selectAllCidades = async function() {

    let sql = `select tbl_cidade.id as id_cidade,
    tbl_cidade.nome as nome_cidade,
    tbl_estado.id as id_estado,
    tbl_estado.nome as nome_estado,
    tbl_estado.sigla  
    from tbl_cidade, tbl_estado 
    where tbl_cidade.id_estado = tbl_estado.id`

    //Executa no banco de dados o scriptSQL
    //$queryRawUnsafe é utilizado quando o scriptSQL está em uma variável
    //$queryRaw é utilizado quando passar o script direto no métodos
    //Ex: $queryRaw('select * from tbl_cidade')
    let rsCidade = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (rsCidade.length > 0)
        return rsCidade
    else
        return false
}

//Retorna uma cidade filtrado pelo id
const selectCidadeById = async function(id) {


    let sql = `select tbl_cidade.id as id_cidade,
    tbl_cidade.nome as nome_cidade,
    tbl_estado.id as id_estado,
    tbl_estado.nome as nome_estado,
    tbl_estado.sigla  
    from tbl_cidade, tbl_estado 
    where tbl_cidade.id_estado = tbl_estado.id and 
    tbl_cidade.id = ${id}`

    let rsCidade = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (rsCidade.length > 0)
        return rsCidade
    else
        return false
}

//Insere um novo registro no Banco de Dados
const insertCidade = async function(dadosCidade) {

    //Script sql para inserir os dados no BD
    let sql = `insert into tbl_cidade(nome,id_estado)
        values
        lower(('${dadosCidade.nome}'),
        "${dadosCidade.id_estado}")`

    //Executa o script sql no banco de dados e recebemos o retorno se deu certo ou não
    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
        return true
    else
        return false
}

//Modifica um registro do banco de dados
const updateCidade = async function(dadosCidade) {
    let sql = `update tbl_cidade set
    nome= lower('${dadosCidade.nome}'),
    id_estado='${dadosCidade.id_estado}'
    where id = ${dadosCidade.id}`


    let result = await prisma.$queryRawUnsafe(sql)


    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false

}

//Deleta um registro do Banco de Dados
const deleteCidade = async function(id) {

    let sql = `delete from tbl_cidade where id=${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false


}

module.exports = {
    selectAllCidades,
    selectCidadeById,
    insertCidade,
    selectLastId,
    updateCidade,
    deleteCidade
}