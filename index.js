require('dotenv').config()
const express = require('express')
const dbUrl = process.env.DATABASE_URL
const dbName = 'OceanJornadaBackend'
const { MongoClient, ObjectId } = require('mongodb')



async function main() {
    const client = new MongoClient(dbUrl)
    console.log('Conectando ao banco de dados..')
    await client.connect()
    console.log('conectado')
    const app = express()
    app.get('/', function (req, res) {
        res.send('Hello world')
    })

    app.get('/oi', function (req, res) {
        res.send('oieeeeeesssss')
    })

    // lista personagens
    const lista = ['Rick Sanchez', 'Morty Smith', 'Summer Smith']

    const db = client.db(dbName)
    const collection = db.collection('items')

    //read all get /item
    app.get('/item', async function (req, res) {
        //realizamos a operação de find na coleection do mongodb
      const items = await collection.find().toArray()
      //envio todos documentos como resposta http
        res.send(items)
    })

    //read by id

    app.get('/item/:id', function (req, res) {
        const id = req.params.id
        res.send(id)
    })

     // Read By ID -> [GET] /item/:id
  app.get('/item/:id', async function (req, res) {
    // Acesso o ID no parâmetro de rota
    const id = req.params.id

    // Acesso o item na collection baseado no ID recebido
    const item = await collection.findOne({
      _id: new ObjectId(id)
    })

    // Envio o item obtido como resposta HTTP
    res.send(item)
  })

  // Sinalizamos que o corpo da requisição está em JSON
  app.use(express.json())

  // Create -> [POST] /item
  app.post('/item', async function (req, res) {
    // Extraímos o corpo da requisição
    const item = req.body

    // Colocamos o item dentro da collection de itens
    await collection.insertOne(item)

    // Enviamos uma resposta de sucesso
    res.send(item)
  })

  //update put /item/id:id
  app.put('/item/:id',async function (req,res){
    const id = req.params.id
    //pegamos o novo item do corpo da requisição
    const novoItem = req.body

    //atualizar no banco de dados
    await collection.updateOne(
        {_id: new ObjectId(id)},
        {$set:novoItem}
    )
    res.send('Item atualizado com sucesso!')
  })

  //delete [delete]/item/:id
  app.delete('/item/:id', async function(req,res){
    const id = req.params.id
    //realizando operação de delete
    await collection.deleteOne({_id:new ObjectId(id)})
    //mensagem de sucesso
    res.send('Item removido com sucesso')

  })

    app.listen(3000)
}
main()