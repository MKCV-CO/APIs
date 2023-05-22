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
 const controllerEscolaPalestra = require('./controller/controller_escola-palestra.js')
 const bodyJSON = bodyParser.json()
 const message = require('./controller/modulo/config.js')

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


 /****************************************************
  * Objetvo: Tabela Escola-Palestra
  * Data: 22/05/2023
  * Versão: 1.0
  ***************************************************/

 //EndPoint: Retorna todos os dados do voluntario
 app.get('/v1/cultural-path/escola-palestra', cors(), async function(request, response) {

     //Solicita a controller que retorne todos as cidades do BD
     let dados = await controllerEscolaPalestra.selecionarTodasEscolaPalestra()
         //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)
 })

 //EndPoint: Retorna dados do voluntario pelo ID
 app.get('/v1/cultural-path/escola-palestra/:id', cors(), async function(request, response) {

     //Recebe o id enviado na requisição
     let idEscolaPalestra = request.params.id

     //Solicita a controller que retorne a cidade filtrada pelo ID do BD
     let dados = await controllerEscolaPalestra.buscarIdEscolaPalestra(idEscolaPalestra)

     //Valida se existem registros para retornar na requisição
     response.status(dados.status)

     response.json(dados)
 })

 //EndPoint: Inseri um novo voluntario
 app.post('/v1/cultural-path/escola-palestra', cors(), bodyJSON, async function(request, response) {

     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados encaminhados no body da requisição
         let dadosBody = request.body

         //Envia os dados para a controller
         let resultInsertDados = await controllerEscolaPalestra.inserirEscolaPalestra(dadosBody)

         //Retorna o status code e a message
         response.status(resultInsertDados.status)
         response.json(resultInsertDados)
     } else {

         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }
 })

 //EndPoint: Atualiza uma escola pelo id
 app.put('/v1/cultural-path/escola-palestra/:id', cors(), bodyJSON, async function(request, response) {
     let contentType = request.headers['content-type']

     if (String(contentType).toLowerCase() == 'application/json') {
         //Recebe os dados do Body
         let dadosBody = request.body


         let idEscolaPalestra = request.params.id
         let resultUpdatedados = await controllerEscolaPalestra.atualizarEscolaPalestra(dadosBody, idEscolaPalestra)

         response.status(resultUpdatedados.status)
         response.json(resultUpdatedados)
     } else {
         response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
         response.json(message.ERROR_INVALID_CONTENT_TYPE)
     }

 })

 //EndPoint: Deleta um voluntario pelo id
 app.delete('/v1/cultural-path/escola-palestra/:id', cors(), bodyJSON, async function(request, response) {

     //Recebe os dados do Body
     let dadosBody = request.body

     let idEscolaPalestra = request.params.id

     let resultDeleteDados = await controllerEscolaPalestra.deletarEscolaPalestra(dadosBody, idEscolaPalestra)

     response.status(resultDeleteDados.status)
     response.json(resultDeleteDados)
 })

 app.listen(8080, function() {
     console.log('Servidor aguardando requisições');

 })