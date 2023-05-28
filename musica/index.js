const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect('mongodb+srv://gustavocord:a99868@cluster0.h3bgjey.mongodb.net/db-musi-code-musica', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conexão com o MongoDB estabelecida.'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

const Musica = require('./musicaModel');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido' });
  }

  jwt.verify(token, 'seu_segredo_do_token', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Falha na autenticação do token' });
    }

    req.user = user;
    next();
  });
}

app.get('/musica', async (req, res) => {
  try {
    const musicas = await Musica.find();
    res.send(musicas);
  } catch (error) {
    console.error('Erro ao buscar as músicas:', error);
    res.status(500).send({ msg: 'Erro ao buscar as músicas.' });
  }
});

app.post('/events', async (req, res) => {
  const event = req.body;

  if (event.type === 'GetAllMusicas') {
    try {
      const musicas = await Musica.find();
      res.send(musicas);
    } catch (error) {
      console.error('Erro ao buscar as músicas:', error);
      res.status(500).send({ msg: 'Erro ao buscar as músicas.' });
    }
  }
});

app.post('/musica', authenticateToken, async (req, res) => {
  const { titulo, letra, autor } = req.body;
  const userId = req.user && req.user.id;
  const fullName = req.user && req.user.fullName;

  if (!userId) {
    return res.status(400).json({ message: 'O campo userId é obrigatório.' });
  }

  try {
    const novaMusica = new Musica({
      titulo,
      letra,
      autor,
      userId,
      fullName,
    });
    await novaMusica.save();

    res.status(201).send(novaMusica);
  } catch (error) {
    console.error('Erro ao salvar a música:', error);
    res.status(500).send({ msg: 'Erro ao salvar a música.' });
  }
});

app.delete('/musica/:id', authenticateToken, async (req, res) => {
  const userId = req.user && req.user.id;
  const musicaId = req.params.id;

  if (!userId) {
    return res.status(400).json({ message: 'O campo userId é obrigatório.' });
  }

  try {
    const musica = await Musica.findOne({ _id: musicaId, userId });

    if (!musica) {
      return res.status(404).json({ message: 'Música não encontrada.' });
    }

    await Musica.findByIdAndRemove(musicaId);

    res.status(200).json({ message: 'Música excluída com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir a música:', error);
    res.status(500).json({ error: 'Erro ao excluir a música.' });
  }
});

app.listen(4000, () => {
  console.log('Servidor de músicas iniciado na porta 4000.');
});
