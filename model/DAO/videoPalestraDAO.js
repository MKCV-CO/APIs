//Import da biblioteca do Prisma Client(Responsável por maniular dados no banco de dados)
const { PrismaClient } = require('@prisma/client')

//Intância da classe do prisma client
const prisma = new PrismaClient()


//Função para retornar um registro filtrado pelo id do Banco de Dados
const selectAllVideosPalestra = async function(){
  
    let sql = 'select * from tbl_videosPalestra'

    let rsvideos = await prisma.$queryRawUnsafe(sql)

    if(rsvideos.length > 0){
        return rsvideos
    }else{
        return false
    }

}

const selectByIdVideo = async function(id) {


    let sql = `select * from tbl_videosPalestra where id = ${id}`

    //Executa no banco de dados o scriptSQL
    //$queryRawUnsafe é utilizado quando o scriptSQL está em uma variável
    //$queryRaw é utilizado quando passar o script direto no métodos
    //Ex: $queryRaw('select * from tbl_aluno')
    let rsvideos = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (rsvideos.length > 0)
        return rsvideos
    else
        return false
}

const insertVideoPalestra = async function(dadosVideos) {


    //Script sql para inserir os dados no BD
    let sql = `insert into tbl_videosPalestra(video,descricao)
        values
        (lower('${dadosVideos.video}'),
        lower('${dadosVideos.descricao}'))`

        

    //Executa o script sql no banco de dados e recebemos o retorno se deu certo ou não
    let result = await prisma.$executeRawUnsafe(sql)
    
    if (result)
        return true
    else
        return false
}

const selectLastId = async function() {

    //Script para retornar apenas o ultimo registro inserido na tabela
    let sql = `select id from tbl_videosPalestra order by id desc limit 1;`

    let rsvideos = await prisma.$queryRawUnsafe(sql)

    if (rsvideos.length > 0)
        return rsvideos[0].id
    else
        return false
}

const updateVideo = async function (dadosVideos) {
    let sql = `update tbl_videosPalestra set 
    video= lower('${dadosVideos.video}'),
    descricao= lower('${dadosVideos.descricao}')
    where id= '${dadosVideos.id}'`


    let result = await prisma.$queryRawUnsafe(sql)


    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false

}

const deleteVideo = async function(id) {

    let sql = `delete from tbl_videosPalestra where id=${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false


}





module.exports = {
    selectAllVideosPalestra,
    selectByIdVideo,
    insertVideoPalestra,
    selectLastId,
    updateVideo,
    deleteVideo
}
