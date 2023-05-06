const express = require("express");
const app = express();
app.use(express.json());

const baseConsulta = {};

const funcoes = {
    
    MusicaCriada: (musica) => {
    baseConsulta[musica.contador] = musica;
     },
    cifraCriada: (cifra) => {
    const cifras =
    baseConsulta[cifra.musicaId]["cifra"] ||
    [];
    observacoes.push(cifra);
    baseConsulta[cifra.lembreteId]["cifra"] =
    cifra;
    }
    };

app.get("/lembretes", (req, res) => {
    res.status(200).send(baseConsulta);
});
    
app.post("/eventos", (req, res) => {
    funcoes[req.body.tipo](req.body.dados);
    res.status(200).send(baseConsulta);
     });
        
    
app.get("/lembretes", (req, res) => {});

 app.post("/eventos", (req, res) => {});

app.listen(6000, () => console.log("Consultas. Porta 6000"));