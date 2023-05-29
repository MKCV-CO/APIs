//Import da biblioteca do Prisma Client(Responsável por maniular dados no banco de dados)
const { PrismaClient } = require('@prisma/client')

//Intância da classe do prisma client
const prisma = new PrismaClient()


//Função para retornar um registro filtrado pelo id do Banco de Dados
const selectAllEmpresas = async function(){
  
    let sql = 'select tbl_estado_comida.*, tbl_estado.*,tbl_comida.* from tbl_estado_comida, tbl_estado, where tbl_em_empresa.id_empresa = tbl_empresa.id'

    let rsEmpresa = await prisma.$queryRawUnsafe(sql)

    

    if(rsEmpresa.length > 0){
        return rsEmpresa
    }else{
        return false
    }

}


const selectByIdEmpresa = async function(id) {


    let sql = `select * from tbl_empresa where id = ${id}`

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


    //Script sql para inserir os dados no BD
    let sql = `insert into tbl_empresa(nome_fantasia,cnpj,razao_social,logo)
        values
        (lower('${dadosEmpresa.nome_fantasia}'),
        lower('${dadosEmpresa.cnpj}'),
        lower('${dadosEmpresa.razao_social}'),
        lower('${dadosEmpresa.logo}'))`

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
    nome_fantasia= lower('${dadosEmpresa.nome_fantasia}'), 
    cnpj=lower('${dadosEmpresa.cnpj}'),
    razao_social= lower('${dadosEmpresa.razao_social}'),
    logo= lower('${dadosEmpresa.logo}')
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
    deleteEmpresa

}