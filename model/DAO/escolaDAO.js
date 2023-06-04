/************************************************************************************
 * Objetvo: Realizar a interação da escola com o banco de dados
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
    let sql = `select id from tbl_escola order by id desc limit 1;`

    let rsEscola = await prisma.$queryRawUnsafe(sql)

    if (rsEscola.length > 0)
        return rsEscola[0].id
    else
        return false
}

//Retorna todos os registros do Banco de Dados
const selectAllEscola = async function() {

    let sql = `select
    tbl_escola.id,
    tbl_escola.nome,
    tbl_escola.cnpj,
    tbl_escola.responsavel,
    tbl_escola.telefone,
    tbl_escola.email,
    tbl_escola.id_endereco
    from
    tbl_escola;`

    //Executa no banco de dados o scriptSQL
    //$queryRawUnsafe é utilizado quando o scriptSQL está em uma variável
    //$queryRaw é utilizado quando passar o script direto no métodos
    //Ex: $queryRaw('select * from tbl_escola')
    let rsEscola = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (rsEscola.length > 0)
        return rsEscola
    else
        return false
}

//Retorna um genero filtrado pelo id
const selectEscolaById = async function(id) {


    let sql = `select
    tbl_escola.id,
    tbl_escola.nome,
    tbl_escola.cnpj,
    tbl_escola.responsavel,
    tbl_escola.telefone,
    tbl_escola.email,
    tbl_escola.id_endereco
    from
    tbl_escola
    where 
    tbl_escola.id = ${id};`

    let rsEscola = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (rsEscola.length > 0)
        return rsEscola
    else
        return false
}




//Retorna um genero filtrado pelo id
const selectEscolaByNome = async function(nome) {

    let sql = `select
    tbl_escola.id,
    tbl_escola.nome,
    tbl_escola.cnpj,
    tbl_escola.responsavel,
    tbl_escola.telefone,
    tbl_escola.email,
    tbl_escola.id_endereco
    from
    tbl_escola

    where
    tbl_escola.nome like '%${nome}%';`


    let rsEscola = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (rsEscola.length > 0)
        return rsEscola
    else
        return false
}

const selectEscolaByIdPalestra = async function(id) {

    console.log(id);


    let sql = `select
    tbl_escola.id,
    tbl_escola.nome,
    tbl_escola.cnpj,
    tbl_escola.responsavel,
    tbl_escola.telefone,
    tbl_escola.email,
    tbl_escola.id_endereco
    from
    tbl_escola,
    tbl_palestra
    where 
    tbl_palestra.id = ${id} and
    tbl_palestra.id_escola = tbl_escola.id;`

    let rsEscola = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (rsEscola.length > 0)
        return rsEscola
    else
        return false
}

//Insere um novo registro no Banco de Dados
const insertEscola = async function(dadosEscola) {

    //Script sql para inserir os dados no BD
    let sql = `insert into tbl_escola(nome, cnpj, responsavel,email,telefone, id_endereco)
        values
        ('${dadosEscola.escola.nome}',
        '${dadosEscola.escola.cnpj}',
        '${dadosEscola.escola.responsavel}',
        '${dadosEscola.escola.email}',
        '${dadosEscola.escola.telefone}',
        "${dadosEscola.escola.id_endereco}")`

    //Executa o script sql no banco de dados e recebemos o retorno se deu certo ou não
    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
        return true
    else
        return false
}

//Modifica um registro do banco de dados
const updateEscola = async function(dadosEscola) {

    console.log(dadosEscola);
    let sql = `update tbl_escola set
    nome='${dadosEscola.escola.nome}',
    cnpj='${dadosEscola.escola.cnpj}',
    responsavel='${dadosEscola.escola.responsavel}',
    email='${dadosEscola.escola.email}',
    telefone='${dadosEscola.escola.telefone}',
    id_endereco='${dadosEscola.endereco.id_endereco}'
    where id = ${dadosEscola.escola.id}`


    let result = await prisma.$queryRawUnsafe(sql)


    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false

}

//Deleta um registro do Banco de Dados
const deleteEscola = async function(id) {

    let sql = `delete from tbl_escola where id=${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false


}

module.exports = {
    selectAllEscola,
    selectEscolaById,
    selectEscolaByIdPalestra,
    insertEscola,
    selectLastId,
    updateEscola,
    deleteEscola,
    selectEscolaByNome
}