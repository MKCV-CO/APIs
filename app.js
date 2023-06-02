 /*
  * Objetvo: Criar uma API para interagir com um banco de dados(GET, POST, DELETE PUT)
  * Autores: Cleiton / MKVC
  * Data: 14/04/2023
  * Versão: 1.0
  */

 /*
    Express- Dependência do node que permite a integração do protocolo HTTP com o código
    npm install express --save

    Cors        - Gerenciador de permissões para o protocolo HTTP
    npm install cors --save

    Body-parser - É uma dependência que permite manipular dados enviados pelo body da requisição
    npm install body-parser --save

  * Para realizar a conexão com o banco de dados, iremos utilizar o Prisma
  *         npm i (baixa tudo de uma vez)
  *
  *        npm install prisma --save
  *        npx prisma init
  *        npm install @prisma/client 
  * 
  */

 //Import das bibliotecas(dependências) do projeto
 const express = require('express')
 const cors = require('cors')
 const bodyParser = require('body-parser')

 //Cria um objeto com as informações da classe express
 const app = express()

 //Defie as permissões no header da API
 app.use((request, response, next) => {
     //Permite gerenciar a origen das requisiçõe da API
     //* - significa que a API será pública
     //IP - se colocar o IP, a API smente responderá para aquela máquina
     response.header('Access-Control-Allow-Origin', '*')

     //Permite gerenciar quais verbos (métodos) poderão fazer requisições
     response.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS')

     //Ativa no cors das requisições as permissões estabelecidas
     app.use(cors())

     next()
 })

 //CRUD (Create, Read, Update, Delete)

 //Import dos arquivos Controllers
 const controllerBioma = require('./controller/controller_bioma.js')
 const controllerEstado = require('./controller/controller_estado.js')
 const controllerCidade = require('./controller/controller_cidade.js')
 const controllerGenero = require('./controller/controller_genero.js')
 const controllerEndereco = require('./controller/controller_endereco.js')
 const controllerVoluntario = require('./controller/controller_voluntario.js')
 const controllerPalestra = require('./controller/controller_palestra.js')
 const controllerEscola = require('./controller/controller_escola.js')
 const controllerComida = require('./controller/controller_comida.js')
 const controllerEmpresa = require('./controller/controller_empresa')
 const controller_email_empresa = require('./controller/controller_email-empresa.js')
 const controller_fotos_palestra = require('./controller/controller_fotos_palestra.js')
 const controller_videosInfantil = require('./controller/controller_videosInfantil.js')
 const controller_videosPalestra = require('./controller/controller_videoPalestra.js')
 const controller_palestraVoluntario = require('./controller/controller_palestra_volutario.js')
 const controller_palestraEmpresa = require('./controller/controller_palestra_empresa.js')
 const bodyJSON = bodyParser.json()
 const message = require('./controller/modulo/config.js')



 /****************************************************
  * Objetvo: Tabela Palestra-Voluntario
  * Data: 22/05/2023
  * Versão: 1.0
  ***************************************************/

 //EndPoint: Retorna todos os dados do voluntario
 app.get('/v1/cultural-path/palestra-voluntario', cors(), async function(request, response) {

     //Solicita a controller que retorne todos as cidades do BD
     let dados = await controller_palestraVoluntario.selecionarTodasPalestras()
         //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)
 })

 //EndPoint: Retorna dados do voluntario pelo ID
 app.get('/v1/cultural-path/palestra-voluntario/:id', cors(), async function(request, response) {

     //Recebe o id enviado na requisição
     let idPalestra = request.params.id

     //Solicita a controller que retorne a cidade filtrada pelo ID do BD
     let dados = await controller_palestraVoluntario.buscarIdPalestra(idPalestra)

     //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)
 })

 //EndPoint: Inseri um novo voluntario
 app.post('/v1/cultural-path/palestra-voluntario', cors(), bodyJSON, async function(request, response) {

     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados encaminhados no body da requisição
         let dadosBody = request.body

         //Envia os dados para a controller
         let resultInsertDados = await controller_palestraVoluntario.inserirPalestra(dadosBody)

         //Retorna o status code e a message
         response.status(resultInsertDados.status)
         response.json(resultInsertDados)
     } else {

         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }
 })

 //EndPoint: Atualiza um voluntario pelo id
 app.put('/v1/cultural-path/palestra-voluntario/:id', cors(), bodyJSON, async function(request, response) {
     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados do Body
         let dadosBody = request.body


         let idPalestra = request.params.id
         let resultUpdatedados = await controller_palestraVoluntario.atualizarPalestra(dadosBody, idPalestra)

         response.status(resultUpdatedados.status)
         response.json(resultUpdatedados)
     } else {
         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }

 })

 //EndPoint: Deleta um voluntario pelo id
 app.delete('/v1/cultural-path/palestra-voluntario/:id', cors(), bodyJSON, async function(request, response) {

     //Recebe os dados do Body
     let dadosBody = request.body

     let idPalestra = request.params.id

     let resultDeleteDados = await controller_palestraVoluntario.deletarPalestra(dadosBody, idPalestra)

     response.status(resultDeleteDados.status)
     response.json(resultDeleteDados)
 })


 /****************************************************
  * Objetvo: Tabela Palestra-Empresa
  * Data: 22/05/2023
  * Versão: 1.0
  ***************************************************/

 //EndPoint: Retorna todos os dados do voluntario
 app.get('/v1/cultural-path/palestra-empresa', cors(), async function(request, response) {

     //Solicita a controller que retorne todos as cidades do BD
     let dados = await controller_palestraEmpresa.selecionarTodasPalestras()
         //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)
 })

 //EndPoint: Retorna dados do voluntario pelo ID
 app.get('/v1/cultural-path/palestra-empresa/:id', cors(), async function(request, response) {

     //Recebe o id enviado na requisição
     let idPalestra = request.params.id

     //Solicita a controller que retorne a cidade filtrada pelo ID do BD
     let dados = await controller_palestraEmpresa.buscarIdPalestra(idPalestra)

     //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)
 })

 //EndPoint: Inseri um novo voluntario
 app.post('/v1/cultural-path/palestra-empresa', cors(), bodyJSON, async function(request, response) {

     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados encaminhados no body da requisição
         let dadosBody = request.body

         //Envia os dados para a controller
         let resultInsertDados = await controller_palestraEmpresa.inserirPalestra(dadosBody)

         //Retorna o status code e a message
         response.status(resultInsertDados.status)
         response.json(resultInsertDados)
     } else {

         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }
 })

 //EndPoint: Atualiza um voluntario pelo id
 app.put('/v1/cultural-path/palestra-empresa/:id', cors(), bodyJSON, async function(request, response) {
     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados do Body
         let dadosBody = request.body


         let idPalestra = request.params.id
         let resultUpdatedados = await controller_palestraEmpresa.atualizarPalestra(dadosBody, idPalestra)

         response.status(resultUpdatedados.status)
         response.json(resultUpdatedados)
     } else {
         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }

 })

 //EndPoint: Deleta um voluntario pelo id
 app.delete('/v1/cultural-path/palestra-empresa/:id', cors(), bodyJSON, async function(request, response) {

     //Recebe os dados do Body
     let dadosBody = request.body

     let idPalestra = request.params.id

     let resultDeleteDados = await controller_palestraEmpresa.deletarPalestra(dadosBody, idPalestra)

     response.status(resultDeleteDados.status)
     response.json(resultDeleteDados)
 })



 /*****************************
Objetvo: TABELA COMIDAS
Data: 20/05/2023
Versão: 1.0
*****************************/

 // ENDPOINT: SELECIONA TODAS AS COMIDAS
 app.get('/v1/cultural-path/comida', cors(), async function(request, response) {

     //Solicita a controller que retorne todos os alunos do BD
     let dados = await controllerComida.selecionarTodasComidas();

     //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)


 })

 //ENDPOINT: SELECIONAR A COMIDA PELO ID
 app.get('/v1/cultural-path/comida/:id', cors(), async function(request, response) {

     //Recebe o id enviado na requisição
     let idComida = request.params.id

     //Solicita a controller que retorne todos os alunos do BD
     let dados = await controllerComida.buscarIdComida(idComida)

     //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)

 })


 // ENDPOINT: Enviar dados a tabela tbl_comida.
 app.post('/v1/cultural-path/comida', bodyJSON, cors(), async function(request, response) {
     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados encaminhados no body da requisição
         let dadosBody = request.body

         //Envia os dados para a controller
         let resultInsertDados = await controllerComida.inserirComida(dadosBody)

         //Retorna o status code e a message
         response.status(resultInsertDados.status)
         response.json(resultInsertDados)
     } else {

         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }
 })

 // ENDPOINT:Objetvo: Atualizar os dados na Tabela tbl_comida.
 app.put('/v1/cultural-path/comida/:id', cors(), bodyJSON, async function(request, response) {

     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados do Body
         let dadosBody = request.body

         //Recebe o id do aluno
         let idComida = request.params.id
         let resultUpdatedados = await controllerComida.atualizarComida(dadosBody, idComida)

         response.status(resultUpdatedados.status)
         response.json(resultUpdatedados)
     } else {

         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }

 })

 // ENDPOINT: Objetvo: Deleta o registro da tabela tbl_comida peloo id.
 app.delete('/v1/cultural-path/comida/:id', cors(), bodyJSON, async function(request, response) {
     //Recebe os dados do Body
     let dadosBody = request.body

     //Recebe o id do aluno
     let idComida = request.params.id

     let resultDeleteDados = await controllerComida.deletarComidas(dadosBody, idComida)

     response.status(resultDeleteDados.status)
     response.json(resultDeleteDados)

 })

 /*****************************
 Objetvo:  Tabela EMPRESA
 Data: 21/05/2023
 Autor: Kauê - MKVC
 Versão: 1.0
 *****************************/

 // ENDPOINT: SELECIONA TODAS AS EMPRESAS
 app.get('/v1/cultural-path/empresa', cors(), async function(request, response) {

     //Solicita a controller que retorne todos os alunos do BD
     let dados = await controllerEmpresa.selecionarTodasEmpresas();

     //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)

 })

 // ENDPOINT: SELECIONA TODAS AS EMPRESAS PELO ID
 app.get('/v1/cultural-path/empresa/:id', cors(), bodyJSON, async function(request, response) {

     //Recebe o id enviado na requisição
     let idEmpresa = request.params.id

     //Solicita a controller que retorne todos os alunos do BD
     let dados = await controllerEmpresa.buscarIdEmpresa(idEmpresa)

     //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)

 });
 // ENDPOINT: SELECIONA TODAS AS EMPRESAS PELO ID
 app.get('/v1/cultural-path/empresa-nome', cors(), bodyJSON, async function(request, response) {

     //Recebe o id enviado na requisição
     let nomeEmpresa = request.query.nome

     //Solicita a controller que retorne todos os alunos do BD
     let dados = await controllerEmpresa.buscarNome(nomeEmpresa)

     //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)

 });

 // ENDPOINT: ENVIA DADOS PARA UM NOVO CADASTRO DE EMPRESA
 app.post('/v1/cultural-path/empresa', bodyJSON, cors(), async function(request, response) {
     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados encaminhados no body da requisição
         let dadosBody = request.body

         //Envia os dados para a controller
         let resultInsertDados = await controllerEmpresa.inserirEmpresa(dadosBody)

         //Retorna o status code e a message
         response.status(resultInsertDados.status)
         response.json(resultInsertDados)
     } else {

         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }
 })

 // ENDPOINT: ATUALIZA A EMPRESA PELO ID
 app.put('/v1/cultural-path/empresa/:id', cors(), bodyJSON, async function(request, response) {

     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados do Body
         let dadosBody = request.body

         //Recebe o id do aluno
         let idEmpresa = request.params.id
         let resultUpdatedados = await controllerEmpresa.atualizarEmpresa(dadosBody, idEmpresa)

         response.status(resultUpdatedados.status)
         response.json(resultUpdatedados)
     } else {

         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }

 })

 // ENDPOINT: DELETA O REGISTRO DA TABELA PELO ID
 app.delete('/v1/cultural-path/empresa/:id', cors(), bodyJSON, async function(request, response) {
     //Recebe os dados do Body
     let dadosBody = request.body

     //Recebe o id do aluno
     let idEmpresa = request.params.id

     let resultDeleteDados = await controllerEmpresa.deletarEmpresa(dadosBody, idEmpresa)

     response.status(resultDeleteDados.status)
     response.json(resultDeleteDados)

 })


 /****************************
 Objetvo:  Tabela EMAIL-EMPRESA
 Data: 21/05/2023
 Autor: Kauê - MKVC
 Versão: 1.0
 *****************************/
 // ENDPOINT: SELECIONA TODOS OS EMAILS DAS EMPRESAS
 app.get('/v1/cultural-path/email-empresa', cors(), async function(request, response) {

     //Solicita a controller que retorne todos os alunos do BD
     let dados = await controller_email_empresa.selecionarTodosEmailsEmpresa();

     //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)

 })

 // ENDPOINT: SELECIONA TODAS OS EMAILS DAS EMPRESAS PELO ID
 app.get('/v1/cultural-path/email-empresa/empresa/:id', cors(), bodyJSON, async function(request, response) {

     //Recebe o id enviado na requisição
     let idEmpresa = request.params.id

     //Solicita a controller que retorne todos os alunos do BD
     let dados = await controller_email_empresa.buscarIdEmpresa(idEmpresa)

     //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)

 });

 // ENDPOINT: SELECIONA TODAS OS EMAILS DAS EMPRESAS PELO ID
 app.get('/v1/cultural-path/email-empresa/:id', cors(), bodyJSON, async function(request, response) {

     //Recebe o id enviado na requisição
     let idEmail = request.params.id

     //Solicita a controller que retorne todos os alunos do BD
     let dados = await controller_email_empresa.buscarIdEmail(idEmail)

     //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)

 });

 // ENDPOINT: ENVIA DADOS PARA UM NOVO CADASTRO DE EMAIL
 app.post('/v1/cultural-path/email-empresa', bodyJSON, cors(), async function(request, response) {
     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados encaminhados no body da requisição
         let dadosBody = request.body

         //Envia os dados para a controller
         let resultInsertDados = await controller_email_empresa.inserirEmail(dadosBody)

         //Retorna o status code e a message
         response.status(resultInsertDados.status)
         response.json(resultInsertDados)
     } else {

         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }
 })

 // ENDPOINT: ATUALIZA A EMPRESA PELO ID
 app.put('/v1/cultural-path/email-empresa/:id', cors(), bodyJSON, async function(request, response) {

     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados do Body
         let dadosBody = request.body

         //Recebe o id do aluno
         let idEmpresa = request.params.id
         let resultUpdatedados = await controller_email_empresa.atualizarEmailEmpresa(dadosBody, idEmpresa)

         response.status(resultUpdatedados.status)
         response.json(resultUpdatedados)
     } else {

         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }

 })

 // ENDPOINT: DELETA O REGISTRO DA TABELA PELO ID
 app.delete('/v1/cultural-path/email-empresa/:id', cors(), bodyJSON, async function(request, response) {
     //Recebe os dados do Body
     let dadosBody = request.body

     //Recebe o id do aluno
     let idEmail = request.params.id

     let resultDeleteDados = await controller_email_empresa.deletarEmpresa(dadosBody, idEmail)

     response.status(resultDeleteDados.status)
     response.json(resultDeleteDados)

 })

 /******************************
 Objetvo:  Tabela FOTOS-PALESTRA
 Data: 21/05/2023
 Autor: Kauê - MKVC
 Versão: 1.0
 *****************************/
 // ENDPOINT: SELECIONA TODOS AS FOTOS DAS PALESTRAS
 app.get('/v1/cultural-path/fotos-palestra', cors(), async function(request, response) {

     //Solicita a controller que retorne todos os alunos do BD
     let dados = await controller_fotos_palestra.selecionarTodasAsFotos();

     //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)

 })

 // ENDPOINT: SELECIONA TODAS AS FOTO DAS PALESTRAS PELO ID
 app.get('/v1/cultural-path/fotos-palestra/:id', cors(), bodyJSON, async function(request, response) {

     //Recebe o id enviado na requisição
     let idFoto = request.params.id

     //Solicita a controller que retorne todos os alunos do BD
     let dados = await controller_fotos_palestra.buscarIdFotos(idFoto)

     //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)

 });

 // ENDPOINT: ENVIA DADOS PARA UM NOVO CADASTRO DE FOTO
 app.post('/v1/cultural-path/fotos-palestra', bodyJSON, cors(), async function(request, response) {
     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados encaminhados no body da requisição
         let dadosBody = request.body

         //Envia os dados para a controller
         let resultInsertDados = await controller_fotos_palestra.inserirFoto(dadosBody)

         //Retorna o status code e a message
         response.status(resultInsertDados.status)
         response.json(resultInsertDados)
     } else {

         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }
 })

 // ENDPOINT: ATUALIZA A FOTO PELO ID
 app.put('/v1/cultural-path/fotos-palestra/:id', cors(), bodyJSON, async function(request, response) {

         let contentType = request.headers['content-type']

         if (String(contentType).toLowerCase() == 'application/json') {
             //Recebe os dados do Body
             let dadosBody = request.body

             //Recebe o id do aluno
             let idFoto = request.params.id
             let resultUpdatedados = await controller_fotos_palestra.atualizarFotos(dadosBody, idFoto)

             response.status(resultUpdatedados.status)
             response.json(resultUpdatedados)
         } else {

             response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
             response.json(message.ERROR_INVALID_CONTENT_TYPE)
         }

     })
     // ENDPOINT: DELETA O REGISTRO DA FOTO PELO ID
 app.delete('/v1/cultural-path/fotos-palestra/:id', cors(), bodyJSON, async function(request, response) {
     //Recebe os dados do Body
     let dadosBody = request.body

     //Recebe o id do aluno
     let idFoto = request.params.id

     let resultDeleteDados = await controller_fotos_palestra.deletarFoto(dadosBody, idFoto)

     response.status(resultDeleteDados.status)
     response.json(resultDeleteDados)

 })

 /**************************************
 Objetvo:  Tabela VIDEOS-INFANTIL
 Data: 22/05/2023
 Autor: Kauê - MKVC
 Versão: 1.0
 *****************************/
 // ENDPOINT: SELECIONA TODOS OS VIDEOS INFANTIS
 app.get('/v1/cultural-path/videos-infantil', cors(), async function(request, response) {

     //Solicita a controller que retorne todos os alunos do BD
     let dados = await controller_videosInfantil.selecionarTodosOsVideosInfantil();

     //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)

 })

 // ENDPOINT: SELECIONA TODAS OS VIDEOS INFANTIS PELO ID
 app.get('/v1/cultural-path/videos-infantil/:id', cors(), bodyJSON, async function(request, response) {

     //Recebe o id enviado na requisição
     let idVideo = request.params.id

     //Solicita a controller que retorne todos os alunos do BD
     let dados = await controller_videosInfantil.buscarIdVideo(idVideo)

     //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)

 });

 // ENDPOINT: ENVIA DADOS PARA UM NOVO CADASTRO DE UM VIDEO INFANTIL
 app.post('/v1/cultural-path/videos-infantil', bodyJSON, cors(), async function(request, response) {
     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados encaminhados no body da requisição
         let dadosBody = request.body

         //Envia os dados para a controller
         let resultInsertDados = await controller_videosInfantil.inserirVideo(dadosBody)

         //Retorna o status code e a message
         response.status(resultInsertDados.status)
         response.json(resultInsertDados)
     } else {

         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }
 })

 // ENDPOINT: ATUALIZA O VIDEO PELO ID
 app.put('/v1/cultural-path/videos-infantil/:id', cors(), bodyJSON, async function(request, response) {

         let contentType = request.headers['content-type']

         if (String(contentType).toLowerCase() == 'application/json') {
             //Recebe os dados do Body
             let dadosBody = request.body

             //Recebe o id do aluno
             let idVideo = request.params.id
             let resultUpdatedados = await controller_videosInfantil.atualizarVideos(dadosBody, idVideo)

             response.status(resultUpdatedados.status)
             response.json(resultUpdatedados)
         } else {

             response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
             response.json(message.ERROR_INVALID_CONTENT_TYPE)
         }

     })
     // ENDPOINT: DELETA O REGISTRO DO VIDEO PELO ID
 app.delete('/v1/cultural-path/videos-infantil/:id', cors(), bodyJSON, async function(request, response) {
     //Recebe os dados do Body
     let dadosBody = request.body

     //Recebe o id do aluno
     let idVideo = request.params.id

     let resultDeleteDados = await controller_videosInfantil.deletarFoto(dadosBody, idVideo)

     response.status(resultDeleteDados.status)
     response.json(resultDeleteDados)

 })

 /*****************************
 Objetvo:  Tabela VIDEOS-PALESTRA
 Data: 22/05/2023
 Autor: Kauê - MKVC
 Versão: 1.0
 *****************************/
 // ENDPOINT: SELECIONA TODOS OS VIDEOS DAS PALESTRAS
 app.get('/v1/cultural-path/videos-palestras', cors(), async function(request, response) {

     //Solicita a controller que retorne todos os alunos do BD
     let dados = await controller_videosPalestra.selecionarTodosOsVideosPalestra();

     //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)

 })

 // ENDPOINT: SELECIONA TODAS OS VIDEOS DAS PALESTRAS PELO ID
 app.get('/v1/cultural-path/videos-palestras/:id', cors(), bodyJSON, async function(request, response) {

     //Recebe o id enviado na requisição
     let idVideo = request.params.id

     //Solicita a controller que retorne todos os alunos do BD
     let dados = await controller_videosPalestra.buscarIdVideo(idVideo)

     //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)

 });

 // ENDPOINT: ENVIA DADOS PARA UM NOVO CADASTRO DE VIDEO
 app.post('/v1/cultural-path/videos-palestras', bodyJSON, cors(), async function(request, response) {
     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados encaminhados no body da requisição
         let dadosBody = request.body

         //Envia os dados para a controller
         let resultInsertDados = await controller_videosPalestra.inserirVideo(dadosBody)

         //Retorna o status code e a message
         response.status(resultInsertDados.status)
         response.json(resultInsertDados)
     } else {

         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }
 })

 // ENDPOINT: ATUALIZA O VIDEO PELO ID
 app.put('/v1/cultural-path/videos-palestras/:id', cors(), bodyJSON, async function(request, response) {

         let contentType = request.headers['content-type']

         if (String(contentType).toLowerCase() == 'application/json') {
             //Recebe os dados do Body
             let dadosBody = request.body

             //Recebe o id do aluno
             let idVideo = request.params.id
             let resultUpdatedados = await controller_videosPalestra.atualizarVideos(dadosBody, idVideo)

             response.status(resultUpdatedados.status)
             response.json(resultUpdatedados)
         } else {

             response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
             response.json(message.ERROR_INVALID_CONTENT_TYPE)
         }

     })
     // ENDPOINT: DELETA O REGISTRO DO VIDEO PELO ID
 app.delete('/v1/cultural-path/videos-palestras/:id', cors(), bodyJSON, async function(request, response) {
     //Recebe os dados do Body
     let dadosBody = request.body

     //Recebe o id do aluno
     let idVideo = request.params.id

     let resultDeleteDados = await controller_videosPalestra.deletarVideo(dadosBody, idVideo)

     response.status(resultDeleteDados.status)
     response.json(resultDeleteDados)

 })


 /*********************************
 Objetvo:  Tabela ESTADO-COMIDA
 Data: 22/05/2023
 Autor: Kauê - MKVC
 Versão: 1.0
 *****************************/
 // ENDPOINT: SELECIONA TODOS OS ESTADOS DO MAPA
 app.get('/v1/cultural-path/estado-comida', cors(), async function(request, response) {

     //Solicita a controller que retorne todos os alunos do BD
     let dados = await controller_estadoMapa.selecionarTodosOsEstadosMapa();

     //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)

 })

 // ENDPOINT: SELECIONA TODAS OS ESTADOS DO MAPA PELO ID
 app.get('/v1/cultural-path/estado-mapa/:id', cors(), bodyJSON, async function(request, response) {

     //Recebe o id enviado na requisição
     let idEstado = request.params.id

     //Solicita a controller que retorne todos os alunos do BD
     let dados = await controller_estadoMapa.buscarIdEstado(idEstado)

     //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)

 });

 // ENDPOINT: SELECIONA TODAS OS ESTADOS DO MAPA PELA SIGLA
 app.get('/v1/cultural-path/estado-comida/:id', cors(), bodyJSON, async function(request, response) {

     //Recebe o id enviado na requisição
     let siglaEstado = request.params.sigla
         //Solicita a controller que retorne todos os alunos do BD
     let dados = await controller_estadoMapa.buscarSigla(siglaEstado)

     //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)

 });

 // ENDPOINT: ENVIA DADOS PARA UM NOVO CADASTRO DO ESTADO
 app.post('/v1/cultural-path/estado-comida', bodyJSON, cors(), async function(request, response) {
     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados encaminhados no body da requisição
         let dadosBody = request.body

         //Envia os dados para a controller
         let resultInsertDados = await controller_estadoMapa.inserirEstado(dadosBody)

         //Retorna o status code e a message
         response.status(resultInsertDados.status)
         response.json(resultInsertDados)
     } else {

         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }
 })

 // ENDPOINT: ATUALIZA O ESTADO PELO ID
 app.put('/v1/cultural-path/estado-comida/:id', cors(), bodyJSON, async function(request, response) {

     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados do Body
         let dadosBody = request.body

         //Recebe o id do aluno
         let idEstado = request.params.id
         let resultUpdatedados = await controller_estadoMapa.atualizarEstado(dadosBody, idEstado)

         response.status(resultUpdatedados.status)
         response.json(resultUpdatedados)
     } else {

         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }

 })

 // ENDPOINT: DELETA O REGISTRO DO ESTADO PELO ID
 app.delete('/v1/cultural-path/estado-comida/:id', cors(), bodyJSON, async function(request, response) {
     //Recebe os dados do Body
     let dadosBody = request.body

     //Recebe o id do aluno
     let idEstado = request.params.id

     let resultDeleteDados = await controller_estadoMapa.deletarEstado(dadosBody, idEstado)

     response.status(resultDeleteDados.status)
     response.json(resultDeleteDados)

 })



 /****************************************************
  * Objetvo: Tabela Bioma
  * Data: 20/05/2023
  * Versão: 1.0
  ***************************************************/

 //EndPoint: Retorna todos os dados de bioma 
 app.get('/v1/cultural-path/bioma', cors(), async function(request, response) {

     //Solicita a controller que retorne todos os biomas do BD
     let dados = await controllerBioma.selecionarTodosBiomas()
         //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)
 })

 //EndPoint: Retorna dados do bioma pelo ID
 app.get('/v1/cultural-path/bioma/:id', cors(), async function(request, response) {

     //Recebe o id enviado na requisição
     let idBioma = request.params.id

     //Solicita a controller que retorne o bioma filtrada pelo ID do BD
     let dados = await controllerBioma.buscarIdBioma(idBioma)

     //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)
 })

 //EndPoint: Inseri um novo bioma
 app.post('/v1/cultural-path/bioma', cors(), bodyJSON, async function(request, response) {

     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados encaminhados no body da requisição
         let dadosBody = request.body

         //Envia os dados para a controller
         let resultInsertDados = await controllerBioma.inserirBioma(dadosBody)

         //Retorna o status code e a message
         response.status(resultInsertDados.status)
         response.json(resultInsertDados)
     } else {

         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }
 })

 //EndPoint: Atualiza um bioma pelo id
 app.put('/v1/cultural-path/bioma/:id', cors(), bodyJSON, async function(request, response) {
     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados do Body
         let dadosBody = request.body

         //Recebe o id do aluno
         let idBioma = request.params.id
         let resultUpdatedados = await controllerBioma.atualizarBiomas(dadosBody, idBioma)

         response.status(resultUpdatedados.status)
         response.json(resultUpdatedados)
     } else {
         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }

 })

 //EndPoint: Deleta um bioma pelo id
 app.delete('/v1/cultural-path/bioma/:id', cors(), bodyJSON, async function(request, response) {

     //Recebe os dados do Body
     let dadosBody = request.body

     //Recebe o id do aluno
     let idBioma = request.params.id

     let resultDeleteDados = await controllerBioma.deletarBiomas(dadosBody, idBioma)

     response.status(resultDeleteDados.status)
     response.json(resultDeleteDados)
 })

 /****************************************************
  * Objetvo: Tabela Estado
  * Data: 21/05/2023
  * Versão: 1.0
  ***************************************************/


 //EndPoint: Retorna todos os dados de estado
 app.get('/v1/cultural-path/estado', cors(), async function(request, response) {

     //Solicita a controller que retorne todos os estados do BD
     let dados = await controllerEstado.selecionarTodosEstados()
         //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)
 })

 //EndPoint: Retorna dados do estado pelo ID
 app.get('/v1/cultural-path/estado/:id', cors(), async function(request, response) {

     //Recebe o id enviado na requisição
     let idEstado = request.params.id

     //Solicita a controller que retorne o estado filtrada pelo ID do BD
     let dados = await controllerEstado.buscarIdEstado(idEstado)

     //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)
 })

 //EndPoint: Inseri um novo estado
 app.post('/v1/cultural-path/estado', cors(), bodyJSON, async function(request, response) {

     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados encaminhados no body da requisição
         let dadosBody = request.body

         //Envia os dados para a controller
         let resultInsertDados = await controllerEstado.inserirEstado(dadosBody)

         //Retorna o status code e a message
         response.status(resultInsertDados.status)
         response.json(resultInsertDados)
     } else {

         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }
 })

 //EndPoint: Atualiza um estado pelo id
 app.put('/v1/cultural-path/estado/:id', cors(), bodyJSON, async function(request, response) {
     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados do Body
         let dadosBody = request.body


         let idEstado = request.params.id
         let resultUpdatedados = await controllerEstado.atualizarEstado(dadosBody, idEstado)

         response.status(resultUpdatedados.status)
         response.json(resultUpdatedados)
     } else {
         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }

 })

 //EndPoint: Deleta um estado pelo id
 app.delete('/v1/cultural-path/estado/:id', cors(), bodyJSON, async function(request, response) {

     //Recebe os dados do Body
     let dadosBody = request.body

     //Recebe o id do aluno
     let idEstado = request.params.id

     let resultDeleteDados = await controllerEstado.deletarEstado(dadosBody, idEstado)

     response.status(resultDeleteDados.status)
     response.json(resultDeleteDados)
 })

 /****************************************************
  * Objetvo: Tabela Cidade
  * Data: 21/05/2023
  * Versão: 1.0
  ***************************************************/

 //EndPoint: Retorna todos os dados de cidade
 app.get('/v1/cultural-path/cidade', cors(), async function(request, response) {

     //Solicita a controller que retorne todos as cidades do BD
     let dados = await controllerCidade.selecionarTodasCidades()
         //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)
 })

 //EndPoint: Retorna dados da cidade pelo ID
 app.get('/v1/cultural-path/cidade/:id', cors(), async function(request, response) {

     //Recebe o id enviado na requisição
     let idCidade = request.params.id

     //Solicita a controller que retorne a cidade filtrada pelo ID do BD
     let dados = await controllerCidade.buscarIdCidade(idCidade)

     //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)
 })

 //EndPoint: Inseri uma nova cidade
 app.post('/v1/cultural-path/cidade', cors(), bodyJSON, async function(request, response) {

     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados encaminhados no body da requisição
         let dadosBody = request.body

         //Envia os dados para a controller
         let resultInsertDados = await controllerCidade.inserirCidade(dadosBody)

         //Retorna o status code e a message
         response.status(resultInsertDados.status)
         response.json(resultInsertDados)
     } else {

         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }
 })

 //EndPoint: Atualiza uma cidade pelo id
 app.put('/v1/cultural-path/cidade/:id', cors(), bodyJSON, async function(request, response) {
     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados do Body
         let dadosBody = request.body


         let idCidade = request.params.id
         let resultUpdatedados = await controllerCidade.atualizarCidade(dadosBody, idCidade)

         response.status(resultUpdatedados.status)
         response.json(resultUpdatedados)
     } else {
         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }

 })

 //EndPoint: Deleta um estado pelo id
 app.delete('/v1/cultural-path/cidade/:id', cors(), bodyJSON, async function(request, response) {

     //Recebe os dados do Body
     let dadosBody = request.body

     //Recebe o id do aluno
     let idCidade = request.params.id

     let resultDeleteDados = await controllerCidade.deletarCidade(dadosBody, idCidade)

     response.status(resultDeleteDados.status)
     response.json(resultDeleteDados)
 })

 /****************************************************
  * Objetvo: Tabela Genero
  * Data: 21/05/2023
  * Versão: 1.0
  ***************************************************/

 //EndPoint: Retorna todos os dados de genero
 app.get('/v1/cultural-path/genero', cors(), async function(request, response) {

     //Solicita a controller que retorne todos as cidades do BD
     let dados = await controllerGenero.selecionarTodosGeneros()
         //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)
 })

 //EndPoint: Retorna dados do genero pelo ID
 app.get('/v1/cultural-path/genero/:id', cors(), async function(request, response) {

     //Recebe o id enviado na requisição
     let idGenero = request.params.id

     //Solicita a controller que retorne a cidade filtrada pelo ID do BD
     let dados = await controllerGenero.buscarIdGenero(idGenero)

     //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)
 })

 //EndPoint: Inseri um novo genero

 app.post('/v1/cultural-path/genero', cors(), bodyJSON, async function(request, response) {

     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados encaminhados no body da requisição
         let dadosBody = request.body

         //Envia os dados para a controller
         let resultInsertDados = await controllerGenero.inserirGenero(dadosBody)

         //Retorna o status code e a message
         response.status(resultInsertDados.status)
         response.json(resultInsertDados)
     } else {

         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }
 })

 //EndPoint: Atualiza um genero pelo id
 app.put('/v1/cultural-path/genero/:id', cors(), bodyJSON, async function(request, response) {
     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados do Body
         let dadosBody = request.body


         let idGenero = request.params.id
         let resultUpdatedados = await controllerGenero.atualizarGenero(dadosBody, idGenero)

         response.status(resultUpdatedados.status)
         response.json(resultUpdatedados)
     } else {
         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }

 })

 //EndPoint: Deleta um genero pelo id
 app.delete('/v1/cultural-path/genero/:id', cors(), bodyJSON, async function(request, response) {

     //Recebe os dados do Body
     let dadosBody = request.body

     let idGenero = request.params.id

     let resultDeleteDados = await controllerGenero.deletarGenero(dadosBody, idGenero)

     response.status(resultDeleteDados.status)
     response.json(resultDeleteDados)
 })

 /****************************************************
  * Objetvo: Tabela Endereço
  * Data: 21/05/2023
  * Versão: 1.0
  ***************************************************/

 //EndPoint: Retorna todos os dados de endereço
 app.get('/v1/cultural-path/endereco', cors(), async function(request, response) {

     //Solicita a controller que retorne todos as cidades do BD
     let dados = await controllerEndereco.selecionarTodosEnderecos()
         //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)
 })

 //EndPoint: Retorna dados do endereço pelo ID
 app.get('/v1/cultural-path/endereco/:id', cors(), async function(request, response) {

     //Recebe o id enviado na requisição
     let idEndereco = request.params.id

     //Solicita a controller que retorne a cidade filtrada pelo ID do BD
     let dados = await controllerEndereco.buscarIdEndereco(idEndereco)

     //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)
 })

 //EndPoint: Inseri um novo endereço
 app.post('/v1/cultural-path/endereco', cors(), bodyJSON, async function(request, response) {

     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados encaminhados no body da requisição
         let dadosBody = request.body

         //Envia os dados para a controller
         let resultInsertDados = await controllerEndereco.inserirEndereco(dadosBody)

         //Retorna o status code e a message
         response.status(resultInsertDados.status)
         response.json(resultInsertDados)
     } else {

         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }
 })

 //EndPoint: Atualiza um endereço pelo id
 app.put('/v1/cultural-path/endereco/:id', cors(), bodyJSON, async function(request, response) {
     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados do Body
         let dadosBody = request.body


         let idEndereco = request.params.id
         let resultUpdatedados = await controllerEndereco.atualizarEndereco(dadosBody, idEndereco)

         response.status(resultUpdatedados.status)
         response.json(resultUpdatedados)
     } else {
         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }

 })

 //EndPoint: Deleta um endereço pelo id
 app.delete('/v1/cultural-path/endereco/:id', cors(), bodyJSON, async function(request, response) {

     //Recebe os dados do Body
     let dadosBody = request.body

     let idEndereco = request.params.id

     let resultDeleteDados = await controllerEndereco.deletarEndereco(dadosBody, idEndereco)

     response.status(resultDeleteDados.status)
     response.json(resultDeleteDados)
 })

 /****************************************************
  * Objetvo: Tabela Voluntario
  * Data: 21/05/2023
  * Versão: 1.0
  ***************************************************/

 //EndPoint: Retorna todos os dados do voluntario
 app.get('/v1/cultural-path/voluntario', cors(), async function(request, response) {

     //Solicita a controller que retorne todos as cidades do BD
     let dados = await controllerVoluntario.selecionarTodosVoluntarios()
         //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)
 })

 //EndPoint: Retorna dados do voluntario pelo ID
 app.get('/v1/cultural-path/voluntario/:id', cors(), async function(request, response) {

     //Recebe o id enviado na requisição
     let idVoluntario = request.params.id

     //Solicita a controller que retorne a cidade filtrada pelo ID do BD
     let dados = await controllerVoluntario.buscarIdVoluntario(idVoluntario)

     //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)
 })

 //EndPoint: Inseri um novo voluntario
 app.post('/v1/cultural-path/voluntario', cors(), bodyJSON, async function(request, response) {

     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados encaminhados no body da requisição
         let dadosBody = request.body

         //Envia os dados para a controller
         let resultInsertDados = await controllerVoluntario.inserirVoluntario(dadosBody)

         //Retorna o status code e a message
         response.status(resultInsertDados.status)
         response.json(resultInsertDados)
     } else {

         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }
 })

 //EndPoint: Atualiza um voluntario pelo id
 app.put('/v1/cultural-path/voluntario/:id', cors(), bodyJSON, async function(request, response) {
     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados do Body
         let dadosBody = request.body


         let idVoluntario = request.params.id
         let resultUpdatedados = await controllerVoluntario.atualizarVoluntario(dadosBody, idVoluntario)

         response.status(resultUpdatedados.status)
         response.json(resultUpdatedados)
     } else {
         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }

 })

 //EndPoint: Deleta um voluntario pelo id
 app.delete('/v1/cultural-path/voluntario/:id', cors(), bodyJSON, async function(request, response) {

     //Recebe os dados do Body
     let dadosBody = request.body

     let idVoluntario = request.params.id

     let resultDeleteDados = await controllerVoluntario.deletarVoluntario(dadosBody, idVoluntario)

     response.status(resultDeleteDados.status)
     response.json(resultDeleteDados)
 })

 /****************************************************
  * Objetvo: Tabela Palestra
  * Data: 22/05/2023
  * Versão: 1.0
  ***************************************************/

 //EndPoint: Retorna todos os dados do voluntario
 app.get('/v1/cultural-path/palestra', cors(), async function(request, response) {

     //Solicita a controller que retorne todos as cidades do BD
     let dados = await controllerPalestra.selecionarTodasPalestras()
         //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)
 })

 //EndPoint: Retorna dados do voluntario pelo ID
 app.get('/v1/cultural-path/palestra/:id', cors(), async function(request, response) {

     //Recebe o id enviado na requisição
     let idPalestra = request.params.id

     //Solicita a controller que retorne a cidade filtrada pelo ID do BD
     let dados = await controllerPalestra.buscarIdPalestra(idPalestra)

     //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)
 })

 //EndPoint: Inseri um novo voluntario
 app.post('/v1/cultural-path/palestra', cors(), bodyJSON, async function(request, response) {

     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados encaminhados no body da requisição
         let dadosBody = request.body

         //Envia os dados para a controller
         let resultInsertDados = await controllerPalestra.inserirPalestra(dadosBody)

         //Retorna o status code e a message
         response.status(resultInsertDados.status)
         response.json(resultInsertDados)
     } else {

         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }
 })

 //EndPoint: Atualiza um voluntario pelo id
 app.put('/v1/cultural-path/palestra/:id', cors(), bodyJSON, async function(request, response) {
     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados do Body
         let dadosBody = request.body


         let idPalestra = request.params.id
         let resultUpdatedados = await controllerPalestra.atualizarPalestra(dadosBody, idPalestra)

         response.status(resultUpdatedados.status)
         response.json(resultUpdatedados)
     } else {
         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }

 })

 //EndPoint: Deleta um voluntario pelo id
 app.delete('/v1/cultural-path/palestra/:id', cors(), bodyJSON, async function(request, response) {

     //Recebe os dados do Body
     let dadosBody = request.body

     let idPalestra = request.params.id

     let resultDeleteDados = await controllerPalestra.deletarPalestra(dadosBody, idPalestra)

     response.status(resultDeleteDados.status)
     response.json(resultDeleteDados)
 })


 /****************************************************
  * Objetvo: Tabela Escola
  * Data: 22/05/2023
  * Versão: 1.0
  ***************************************************/

 //EndPoint: Retorna todos os dados do voluntario
 app.get('/v1/cultural-path/escola', cors(), async function(request, response) {

     //Solicita a controller que retorne todos as cidades do BD
     let dados = await controllerEscola.selecionarTodasEscolas()
         //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)
 })

 //EndPoint: Retorna dados do voluntario pelo ID
 app.get('/v1/cultural-path/escola/:id', cors(), async function(request, response) {

         //Recebe o id enviado na requisição
         let idEscola = request.params.id

         //Solicita a controller que retorne a cidade filtrada pelo ID do BD
         let dados = await controllerEscola.buscarIdEscola(idEscola)

         //Valida se existem registros para retornar na requisição
         response.status(dados.status)

         response.json(dados)
     })
     //EndPoint: Retorna dados do voluntario pelo ID
 app.get('/v1/cultural-path/escola-nome', cors(), async function(request, response, next) {

     //Recebe o id enviado na requisição
     let nomeEscola = request.query.nome



     //Solicita a controller que retorne a cidade filtrada pelo ID do BD
     let dados = await controllerEscola.buscarNomeEscola(nomeEscola)

     //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)
 })

 //EndPoint: Inseri um novo voluntario
 app.post('/v1/cultural-path/escola', cors(), bodyJSON, async function(request, response) {

     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados encaminhados no body da requisição
         let dadosBody = request.body

         //Envia os dados para a controller
         let resultInsertDados = await controllerEscola.inserirEscola(dadosBody)

         //Retorna o status code e a message
         response.status(resultInsertDados.status)
         response.json(resultInsertDados)
     } else {

         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }
 })

 //EndPoint: Atualiza uma escola pelo id
 app.put('/v1/cultural-path/escola/:id', cors(), bodyJSON, async function(request, response) {
     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados do Body
         let dadosBody = request.body


         let idEscola = request.params.id
         let resultUpdatedados = await controllerEscola.atualizarEscola(dadosBody, idEscola)

         response.status(resultUpdatedados.status)
         response.json(resultUpdatedados)
     } else {
         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }

 })

 //EndPoint: Deleta um voluntario pelo id
 app.delete('/v1/cultural-path/escola/:id', cors(), bodyJSON, async function(request, response) {

     //Recebe os dados do Body
     let dadosBody = request.body

     let idEscola = request.params.id

     let resultDeleteDados = await controllerEscola.deletarEscola(dadosBody, idEscola)

     response.status(resultDeleteDados.status)
     response.json(resultDeleteDados)
 })

 app.listen(8080, function() {
     console.log('Servidor aguardando requisições');

 })