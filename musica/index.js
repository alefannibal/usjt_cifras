const express = require("express")
const bodyParser = require("body-parser")
const app = express()
app.use(bodyParser.json())
const musica = {};
let contador = 0;
app.get ('/musica', (req, res)=>{
    res.send(musica)
})
app.put('/musica', (req, res)=>{
    contador++
    const{ titulo,letra,autor } = req.body;
    musica[contador] = {
        contador, titulo, letra, autor
    }
    res.status(201).send(musica[contador])
})

app.listen(4000,() =>{
    console.log("Musica. porta 4000")
})