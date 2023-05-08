const express = require("express")
const bodyParser = require("body-parser")
const axios = require("axios")
const app = express()
app.use(bodyParser.json())
const musica = {};
let contador = 0;
app.post("/eventos", (req, res) => {
    console.log(req.body);
    res.status(200).send({ msg: "ok" });
});
app.get ('/musica', (req, res)=>{
    res.send(musica)
})
app.put('/musica', async (req, res)=>{
    contador++
    const{ titulo,letra,autor } = req.body;
    musica[contador] = {
        contador, titulo, letra, autor
    }
    await axios.post("http://localhost:10000/eventos", {
    tipo: "MusicaPublicada",
    dados: {
    contador,
    titulo, 
    letra, 
    autor
 },
 });
    res.status(201).send(musica[contador])
})

app.listen(4000,() =>{
    console.log("Musica. porta 4000")
})