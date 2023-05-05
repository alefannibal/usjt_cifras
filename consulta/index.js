const express = require("express");
const app = express();
app.use(express.json());

const baseConsulta = {};

const funcoes = {
    
    MusicaCriada: (musica) => {
    baseConsulta[lembrete.contador] = lembrete;
     },
    cifraCriada: (cifra) => {
    const observacoes =
    baseConsulta[cifra.lembreteId]["cifra"] ||
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