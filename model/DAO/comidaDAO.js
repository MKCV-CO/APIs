//Import da biblioteca do Prisma Client(Responsável por maniular dados no banco de dados)
const { PrismaClient } = require('@prisma/client')

//Intância da classe do prisma client
const prisma = new PrismaClient()


//Função para retornar um registro filtrado pelo id do Banco de Dados
const selectAllComidas = async function(id){
  
    let sql = 'select * from tbl_comida'

    let rsComida = await prisma.$queryRawUnsafe(sql)

    if(rsComida.length > 0){
        return rsComida
    }else{
        return false
    }

}

const selectByIdComida = async function(id) {


    let sql = `select * from tbl_comida where id = ${id}`

    //Executa no banco de dados o scriptSQL
    //$queryRawUnsafe é utilizado quando o scriptSQL está em uma variável
    //$queryRaw é utilizado quando passar o script direto no métodos
    //Ex: $queryRaw('select * from tbl_aluno')
    let rsComida = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (rsComida.length > 0)
        return rsComida
    else
        return false
}

const insertComida = async function(dadosComida) {


    //Script sql para inserir os dados no BD
    let sql = `insert into tbl_comida(nome)
        values
        (lower('${dadosComida.nome}'))`

        

    //Executa o script sql no banco de dados e recebemos o retorno se deu certo ou não
    let result = await prisma.$executeRawUnsafe(sql)
    
    if (result)
        return true
    else
        return false
}

const selectLastId = async function() {

    //Script para retornar apenas o ultimo registro inserido na tabela
    let sql = `select id from tbl_comida order by id desc limit 1;`

    let rsComida = await prisma.$queryRawUnsafe(sql)

    if (rsComida.length > 0)
        return rsComida[0].id
    else
        return false
}


const updateComida = async function(dadosComida) {
    let sql = `update tbl_comida set 
    nome=lower('${dadosComida.nome}') where id= ${dadosComida.id}`


    let result = await prisma.$queryRawUnsafe(sql)


    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false

}

const deleteComida = async function(id) {

    let sql = `delete from tbl_comida where id=${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false


}



module.exports = {
    selectAllComidas,
    selectByIdComida,
    insertComida,
    selectLastId,
    updateComida,
    deleteComida
}