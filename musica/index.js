const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const jwt = require('jsonwebtoken');

app.use(bodyParser.json());

mongoose
  .connect('mongodb://localhost:27017/db-musi-code-musica', { 
    //mongodb://127.0.0.1:27017/db-musi-code-consulta 
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conexão com o MongoDB estabelecida.'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

const Musica = require('./musicaModel');

// Middleware para verificar o token de autenticação
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

    req.user = user; // Define req.user com as informações do usuário autenticado
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

app.put('/musica', authenticateToken, async (req, res) => {
  const { titulo, letra, autor } = req.body;
  const userId = req.user && req.user.id; // Obtém o ID do usuário autenticado
  const userEmail = req.user && req.user.email; // Obtém o nome do usuário autenticado

  if (!userId) {
    return res.status(400).json({ message: 'O campo userId é obrigatório.' });
  }

  try {
    const novaMusica = new Musica({
      titulo,
      letra,
      autor,
      userId, // Salva o ID do usuário no documento de música
      userEmail, // Salva o nome do usuário no documento de música
    });
    await novaMusica.save();

    res.status(201).send(novaMusica);
  } catch (error) {
    console.error('Erro ao salvar a música:', error);
    res.status(500).send({ msg: 'Erro ao salvar a música.' });
  }
});

// app.put('/musica', authenticateToken, async (req, res) => {
//   const { titulo, letra, autor } = req.body;
//   const userId = req.user.id; // Obtém o ID do usuário autenticado

//   try {
//     const novaMusica = new Musica({
//       titulo,
//       letra,
//       autor,
//       userId, // Salva o ID do usuário no documento de música
//     });
//     await novaMusica.save();

//     res.status(201).send(novaMusica);
//   } catch (error) {
//     console.error('Erro ao salvar a música:', error);
//     res.status(500).send({ msg: 'Erro ao salvar a música.' });
//   }
// });

  app.listen(4000, () => {
  console.log('Servidor de músicas iniciado na porta 4000.');
  });