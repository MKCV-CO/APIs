//Import da biblioteca do Prisma Client(Responsável por maniular dados no banco de dados)
const { PrismaClient } = require('@prisma/client')

//Intância da classe do prisma client
const prisma = new PrismaClient()


//Função para retornar um registro filtrado pelo id do Banco de Dados
const selectAllEmailsEmpresas = async function(){
  
    let sql = 'select tbl_email_empresa.*, tbl_empresa.* from tbl_email_empresa, tbl_empresa where tbl_email_empresa.id_empresa = tbl_empresa.id'

    let rsEmailEmpresa = await prisma.$queryRawUnsafe(sql)

    

    if(rsEmailEmpresa.length > 0){
        return rsEmailEmpresa
    }else{
        return false
    }

}
const selectByIdEmpresa = async function(id) {


    let sql = `select * from tbl_email_empresa where id_empresa = ${id}`

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
const selectByIdEmail = async function(id) {


    let sql = `select * from tbl_email_empresa where id = ${id}`

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
const selectLastId = async function() {

    //Script para retornar apenas o ultimo registro inserido na tabela
    let sql = `select id from tbl_email_empresa order by id desc limit 1;`

    let rsEmailEmpresa = await prisma.$queryRawUnsafe(sql)

    if (rsEmailEmpresa.length > 0)
        return rsEmailEmpresa[0].id
    else
        return false
}
const insertEmail = async function(dadosEmail) {


    //Script sql para inserir os dados no BD
    let sql = `insert into tbl_email_empresa(email,id_empresa)
        values
        (lower('${dadosEmail.email}'),
        '${dadosEmail.id_empresa}')`

    //Executa o script sql no banco de dados e recebemos o retorno se deu certo ou não
    let result = await prisma.$executeRawUnsafe(sql)
    
    if (result)
        return true
    else
        return false
}
const updateEmail = async function(dadosEmail) {

    
    let sql = `update tbl_email_empresa set 
    email = lower('${dadosEmail.email}'),
    id_empresa = '${dadosEmail.id_empresa}'
    where id = '${dadosEmail.id}'`


    let result = await prisma.$queryRawUnsafe(sql)


    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false

}
const deleteEmail = async function(id) {

    let sql = `delete from tbl_email_empresa where id=${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false


}
module.exports = {
    selectAllEmailsEmpresas,
    selectByIdEmpresa,
    selectByIdEmail,
    selectLastId,
    insertEmail,
    updateEmail,
    deleteEmail

}