const express = require('express')
const dbUrl = 'mongodb+srv://admin:gdlMhyeNRuPWW8eZ@cluster0.ifsmzso.mongodb.net'
const dbName = 'OceanJornadaBackend'
const { MongoClient } = require('mongodb')

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


    //read all get /item
    app.get('/item', function (req, res) {
        res.send(lista)
    })

    //read by id

    app.get('/item/:id', function (req, res) {
        const id = req.params.id
        res.send(id)
    })
    // post

    app.use(express.json())

    app.post('/item', function (req, res) {
        const body = req.body

        const item = body.nome

        lista.push(item)

        res.send('Item adicionado com sucesso')
    })
    app.listen(3000)
}
main()