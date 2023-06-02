//Import da biblioteca do Prisma Client(Responsável por maniular dados no banco de dados)
const { PrismaClient } = require('@prisma/client')

//Intância da classe do prisma client
const prisma = new PrismaClient()


//Função para retornar um registro filtrado pelo id do Banco de Dados
const selectAllEmpresas = async function() {

    let sql = `select tbl_empresa.id, tbl_empresa.cnpj, tbl_empresa.razao_social,tbl_empresa.email,tbl_empresa.telefone,tbl_mensagem.mensagem, tbl_tipo_contato.nome as contato
    from tbl_empresa
		inner join tbl_mensagem
			on tbl_mensagem.id = tbl_empresa.id_mensagem
		inner join tbl_tipo_contato
            on tbl_tipo_contato.id = tbl_empresa.id_tipo_contato
            order by tbl_empresa.id asc;`

    let rsEmpresa = await prisma.$queryRawUnsafe(sql)



    if (rsEmpresa.length > 0) {
        return rsEmpresa
    } else {
        return false
    }

}


const selectByIdEmpresa = async function(id) {


    let sql = `select tbl_empresa.id, tbl_empresa.cnpj, tbl_empresa.razao_social,tbl_empresa.email,tbl_empresa.telefone,tbl_mensagem.mensagem, tbl_tipo_contato.nome as contato
    from tbl_empresa
		inner join tbl_mensagem
			on tbl_mensagem.id = tbl_empresa.id_mensagem
		inner join tbl_tipo_contato
            on tbl_tipo_contato.id = tbl_empresa.id_tipo_contato
        where tbl_empresa.id = ${id};`

    //Executa no banco de dados o scriptSQL
    //$queryRawUnsafe é utilizado quando o scriptSQL está em uma variável
    //$queryRaw é utilizado quando passar o script direto no métodos
    //Ex: $queryRaw('select * from tbl_aluno')
    let rsEmpresa = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (rsEmpresa.length > 0)
        return rsEmpresa
    else
        return false
}
const selectByNomeEmpresa = async function(nome) {


    let sql = `select * from tbl_empresa where razao_social like '%${nome}%'`

    //Executa no banco de dados o scriptSQL
    //$queryRawUnsafe é utilizado quando o scriptSQL está em uma variável
    //$queryRaw é utilizado quando passar o script direto no métodos
    //Ex: $queryRaw('select * from tbl_aluno')
    let rsEmpresa = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (rsEmpresa.length > 0)
        return rsEmpresa
    else
        return false
}

const insertEmpresa = async function(dadosEmpresa) {
    console.log(dadosEmpresa);


    //Script sql para inserir os dados no BD
    let sql = `insert into tbl_empresa(telefone,cnpj,id_mensagem,id_tipo_contato,razao_social,email)
        values(
       '${dadosEmpresa.telefone}',
        '${dadosEmpresa.cnpj}',
        ${dadosEmpresa.id_mensagem},
    ${dadosEmpresa.id_tipo_contato},
    '${dadosEmpresa.email}',
        '${dadosEmpresa.razao_social}')`

    //Executa o script sql no banco de dados e recebemos o retorno se deu certo ou não
    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
        return true
    else
        return false
}

const selectLastId = async function() {

    //Script para retornar apenas o ultimo registro inserido na tabela
    let sql = `select id from tbl_empresa order by id desc limit 1;`

    let rsEmpresa = await prisma.$queryRawUnsafe(sql)

    if (rsEmpresa.length > 0)
        return rsEmpresa[0].id
    else
        return false
}

const updateEmpresa = async function(dadosEmpresa) {


    let sql = `update tbl_empresa set 
    cnpj ='${dadosEmpresa.cnpj}',
    razao_social ='${dadosEmpresa.razao_social}',
    telefone ='${dadosEmpresa.telefone}',
    email ='${dadosEmpresa.email}',
    id_mensagem = '${dadosEmpresa.id_mensagem}'
    id_tipo_contato = '${dadosEmpresa.id_tipo_contato}'
    where id= ${dadosEmpresa.id}`


    let result = await prisma.$queryRawUnsafe(sql)


    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false

}

const deleteEmpresa = async function(id) {

    let sql = `delete from tbl_empresa where id=${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false


}



module.exports = {
    selectAllEmpresas,
    selectByIdEmpresa,
    selectLastId,
    insertEmpresa,
    updateEmpresa,
    deleteEmpresa,
    selectByNomeEmpresa

}