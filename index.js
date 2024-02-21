const express = require('express')
const app = express()

app.get('/',function(req,res){
    res.send('Hello world')
})

app.get('/oi',function(req,res){
    res.send('oieeeeeesssss')
})

// lista personagens
const lista = ['Rick Sanchez', 'Morty Smith','Summer Smith']
app.listen(3000)

//read all get /item
app.get('/item', function(req,res){
    res.send(lista)
})

//read by id

app.get('/item/:id', function(req,res){
    const id = req.params.id
    res.send(id)
    })
// post

app.use(express.json())

app.post('/item',function(req,res){
    const body = req.body

    const item = body.nome

    lista.push(item)

    res.send('Item adicionado com sucesso')
})