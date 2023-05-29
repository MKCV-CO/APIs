//Import da biblioteca do Prisma Client(Responsável por maniular dados no banco de dados)
const { PrismaClient } = require('@prisma/client')

//Intância da classe do prisma client
const prisma = new PrismaClient()


//Função para retornar um registro filtrado pelo id do Banco de Dados
const selectAllFotos = async function(){
  
    let sql = 'select * from tbl_fotosPalestra'

    let rsFotos = await prisma.$queryRawUnsafe(sql)

    if(rsFotos.length > 0){
        return rsFotos
    }else{
        return false
    }

}

const selectByIdFoto = async function(id) {


    let sql = `select * from tbl_fotosPalestra where id = ${id}`

    //Executa no banco de dados o scriptSQL
    //$queryRawUnsafe é utilizado quando o scriptSQL está em uma variável
    //$queryRaw é utilizado quando passar o script direto no métodos
    //Ex: $queryRaw('select * from tbl_aluno')
    let rsFoto = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (rsFoto.length > 0)
        return rsFoto
    else
        return false
}

const insertFoto = async function(dadosFotos) {


    //Script sql para inserir os dados no BD
    let sql = `insert into tbl_fotosPalestra(foto,descricao)
        values
        (lower('${dadosFotos.foto}'),
        lower('${dadosFotos.descricao}'))`

        

    //Executa o script sql no banco de dados e recebemos o retorno se deu certo ou não
    let result = await prisma.$executeRawUnsafe(sql)
    
    if (result)
        return true
    else
        return false
}

const selectLastId = async function() {

    //Script para retornar apenas o ultimo registro inserido na tabela
    let sql = `select id from tbl_fotosPalestra order by id desc limit 1;`

    let rsFoto = await prisma.$queryRawUnsafe(sql)

    if (rsFoto.length > 0)
        return rsFoto[0].id
    else
        return false
}

const updateFoto = async function (dadosFotos) {
    let sql = `update tbl_fotosPalestra set 
    foto=lower('${dadosFotos.foto}'),descricao= lower('${dadosFotos.descricao}')
    where id= '${dadosFotos.id}'`


    let result = await prisma.$queryRawUnsafe(sql)


    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false

}

const deleteFoto = async function(id) {

    let sql = `delete from tbl_fotosPalestra where id=${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false


}





module.exports = {
    selectAllFotos,
    selectByIdFoto,
    insertFoto,
    selectLastId,
    updateFoto,
    deleteFoto
}
