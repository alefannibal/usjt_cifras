const express = require("express");
const app = express();
app.use(express.json());

const baseConsulta = {};

const funcoes = {
    MusicaPublicada: (musica) => {
        baseConsulta[musica.contador] = musica;
    },
    CifrasCriadas: (cifra) => {
        const cifras = baseConsulta[cifra.MusicaId]["cifras"] || [];
        cifras.push(cifra);
        baseConsulta[cifra.MusicaId]["cifras"] = cifras;
    }
};

app.get("/musica", (req, res) => {
    res.status(200).send(baseConsulta);
});

<<<<<<< Updated upstream
app.post("/eventos", (req, res) => {
    funcoes[req.body.tipo](req.body.dados);
    res.status(200).send(baseConsulta);
=======
// retorna todas as musicas adicionada pelo usuario

app.get('/minhas-musicas', authenticateToken, async (req, res) => {
  const userId = req.user && req.user.id;

  if (!userId) {
    return res.status(400).json({ message: 'O campo userId é obrigatório.' });
  }

  try {
    console.log('UserId:', userId);
    const musicas = await Musica.find({ userId }).populate('userId', 'fullName');
    console.log('Músicas:', musicas);
    res.status(200).json(musicas);
  } catch (err) {
    console.error('Erro ao consultar músicas:', err);
    res.status(500).json({ error: 'Erro ao consultar músicas' });
  }
>>>>>>> Stashed changes
});

app.listen(6000, () => console.log("Consultas. Porta 6000"));