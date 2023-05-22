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
    let sql = `select id from tbl_voluntario order by id desc limit 1;`

    let rsVoluntario = await prisma.$queryRawUnsafe(sql)

    if (rsVoluntario.length > 0)
        return rsVoluntario[0].id
    else
        return false
}

//Retorna todos os registros do Banco de Dados
const selectAllVoluntario = async function() {

    let sql = 'select * from tbl_voluntario'

    //Executa no banco de dados o scriptSQL
    //$queryRawUnsafe é utilizado quando o scriptSQL está em uma variável
    //$queryRaw é utilizado quando passar o script direto no métodos
    //Ex: $queryRaw('select * from tbl_voluntario')
    let rsVoluntario = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (rsVoluntario.length > 0)
        return rsVoluntario
    else
        return false
}

//Retorna um genero filtrado pelo id
const selectVoluntarioById = async function(id) {


    let sql = `select * from tbl_voluntario where id = ${id}`

    let rsVoluntario = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (rsVoluntario.length > 0)
        return rsVoluntario
    else
        return false
}

//Insere um novo registro no Banco de Dados
const insertVoluntario = async function(dadosVoluntario) {

    //Script sql para inserir os dados no BD
    let sql = `insert into tbl_voluntario(nome,
        cpf,
        rg,
        email,
        telefone,
        data_nascimento,
        estado_civil,
        foto_rg,
        foto_diploma,
        contribuicao,
        id_genero,
        id_endereco
        )values('${dadosVoluntario.nome}',
        "${dadosVoluntario.cpf}",
        "${dadosVoluntario.rg}",
        "${dadosVoluntario.email}",
        "${dadosVoluntario.telefone}",
        "${dadosVoluntario.data_nascimento}",
        "${dadosVoluntario.estado_civil}",
        "${dadosVoluntario.foto_rg}",
        "${dadosVoluntario.foto_diploma}",
        "${dadosVoluntario.foto_contribuicao}",
        ${dadosVoluntario.id_genero},
        ${dadosVoluntario.id_endereco}
        )`

    //Executa o script sql no banco de dados e recebemos o retorno se deu certo ou não
    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
        return true
    else
        return false
}

//Modifica um registro do banco de dados
const updateVoluntario = async function(dadosVoluntario) {
    let sql = `update tbl_voluntario set
    nome='${dadosVoluntario.nome}',
    cpf="${dadosVoluntario.cpf}",
    rg="${dadosVoluntario.rg}",
    email="${dadosVoluntario.email}",
    telefone="${dadosVoluntario.telefone}",
    data_nascimento="${dadosVoluntario.data_nascimento}",
    estado_civil="${dadosVoluntario.estado_civil}",
    foto_rg="${dadosVoluntario.foto_rg}",
    foto_diploma="${dadosVoluntario.foto_diploma}",
    foto_diploma="${dadosVoluntario.contribuicao}",
    id_genero=${dadosVoluntario.id_genero},
    id_endereco=${dadosVoluntario.id_endereco}
    where id = ${dadosVoluntario.id}`

    let result = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false

}

//Deleta um registro do Banco de Dados
const deleteVoluntario = async function(id) {

    let sql = `delete from tbl_voluntario where id=${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false


}

module.exports = {
    selectAllVoluntario,
    selectVoluntarioById,
    insertVoluntario,
    selectLastId,
    updateVoluntario,
    deleteVoluntario
}