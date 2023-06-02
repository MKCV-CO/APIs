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

    let sql = `tbl_voluntario.id,
    tbl_voluntario.nome,
    tbl_voluntario.cpf,
    tbl_voluntario.rg,
    tbl_voluntario.email,
    tbl_voluntario.telefone,
    date_format(tbl_voluntario.data_nascimento, "%d/%m/%Y") as data_nascimento ,
   TIMESTAMPDIFF(YEAR, tbl_voluntario.data_nascimento,NOW()) as idade,
    tbl_voluntario.foto_rg,
    tbl_voluntario.foto_diploma,
    tbl_voluntario.contribuicao
    from 
    tbl_voluntario `

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


    let sql = `select tbl_voluntario.id,
    tbl_voluntario.nome,
    tbl_voluntario.cpf,
    tbl_voluntario.rg,
    tbl_voluntario.email,
    tbl_voluntario.telefone,
    tbl_voluntario.data_nascimento,
    tbl_voluntario.foto_rg,
    tbl_voluntario.foto_diploma,
    tbl_voluntario.contribuicao
    from 
    tbl_voluntario 
    where
    tbl_voluntario.id = ${id}; `

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
        foto_rg,
        foto_diploma,
        contribuicao,
        id_genero,
        id_estado_civil,
        id_endereco
        )values('${dadosVoluntario.voluntario.nome}',
        "${dadosVoluntario.voluntario.cpf}",
        "${dadosVoluntario.voluntario.rg}",
        "${dadosVoluntario.voluntario.email}",
        "${dadosVoluntario.voluntario.telefone}",
        "${dadosVoluntario.voluntario.data_nascimento}",
        "${dadosVoluntario.voluntario.foto_rg}",
        "${dadosVoluntario.voluntario.foto_diploma}",
        "${dadosVoluntario.voluntario.contribuicao}",
        ${dadosVoluntario.voluntario.id_genero},
        ${dadosVoluntario.voluntario.id_estado_civil},
        ${dadosVoluntario.voluntario.id_endereco}
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
    nome='${dadosVoluntario.voluntario.nome}',
    cpf="${dadosVoluntario.voluntario.cpf}",
    rg="${dadosVoluntario.voluntario.rg}",
    email="${dadosVoluntario.voluntario.email}",
    telefone="${dadosVoluntario.voluntario.telefone}",
    data_nascimento="${dadosVoluntario.voluntario.data_nascimento}",
    foto_rg="${dadosVoluntario.voluntario.foto_rg}",
    foto_diploma="${dadosVoluntario.voluntario.foto_diploma}",
    foto_contribuicao="${dadosVoluntario.voluntario.contribuicao}",
    id_genero=${dadosVoluntario.voluntario.id_genero},
    id_estado_civil=${dadosVoluntario.voluntario.id_estado_civil},
    id_endereco=${dadosVoluntario.endereco.id_endereco}
    where id = ${dadosVoluntario.voluntario.id}`

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