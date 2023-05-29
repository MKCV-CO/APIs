//Import da biblioteca do Prisma Client(Responsável por maniular dados no banco de dados)
const { PrismaClient } = require('@prisma/client')

//Intância da classe do prisma client
const prisma = new PrismaClient()


//Função para retornar um registro filtrado pelo id do Banco de Dados
const selectAllVideosInfantil = async function(){
  
    let sql = 'select * from tbl_videoInfantil'

    let rsvideos = await prisma.$queryRawUnsafe(sql)

    if(rsvideos.length > 0){
        return rsvideos
    }else{
        return false
    }

}

const selectByIdVideo = async function(id) {


    let sql = `select * from tbl_videoInfantil where id = ${id}`

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

const insertVideoInfatil = async function(dadosVideos) {


    //Script sql para inserir os dados no BD
    let sql = `insert into tbl_videoInfantil(titulo,descricao,url)
        values
        (lower('${dadosVideos.titulo}'),
        lower('${dadosVideos.descricao}'),
        '${dadosVideos.url}')`

        

    //Executa o script sql no banco de dados e recebemos o retorno se deu certo ou não
    let result = await prisma.$executeRawUnsafe(sql)
    
    if (result)
        return true
    else
        return false
}

const selectLastId = async function() {

    //Script para retornar apenas o ultimo registro inserido na tabela
    let sql = `select id from tbl_videoInfantil order by id desc limit 1;`

    let rsvideos = await prisma.$queryRawUnsafe(sql)

    if (rsvideos.length > 0)
        return rsvideos[0].id
    else
        return false
}

const updateVideo = async function (dadosVideos) {
    let sql = `update tbl_videoInfantil set 
    titulo= lower('${dadosVideos.titulo}'),
    descricao= lower('${dadosVideos.descricao}'),
    url = '${dadosVideos.url}'
    where id= '${dadosVideos.id}'`


    let result = await prisma.$queryRawUnsafe(sql)


    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false

}

const deleteVideo = async function(id) {

    let sql = `delete from tbl_videoInfantil where id=${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retonou algum registro
    if (result)
        return true
    else
        return false


}





module.exports = {
    selectAllVideosInfantil,
    selectByIdVideo,
    insertVideoInfatil,
    selectLastId,
    updateVideo,
    deleteVideo
}
