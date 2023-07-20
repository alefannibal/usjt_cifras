const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const musicaMongoURI = 'mongodb+srv://gustavocord:a99868@cluster0.h3bgjey.mongodb.net/db-musi-code-musica';
const usuarioMongoURI = 'mongodb+srv://gustavocord:a99868@cluster0.h3bgjey.mongodb.net/db-musi-code-usuarios';

// Conexão com o banco de músicas
const musicaDB = mongoose.createConnection(musicaMongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Conexão com o banco de usuários
const usuarioDB = mongoose.createConnection(usuarioMongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(express.json());
app.use(cors()); // Habilitar CORS

const UsuarioSchema = new mongoose.Schema({
  fullName: String,
  password: String,
  email: String,
  description: String
});

// Modelo de usuário conectado ao banco de usuários
const Usuario = usuarioDB.model('Usuario', UsuarioSchema);

const MusicaSchema = new mongoose.Schema({
  titulo: String,
  letra: String,
  autor: String,
  fullName: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  }
});

// Modelo de música conectado ao banco de músicas
const Musica = musicaDB.model('Musica', MusicaSchema);

// Função de autenticação do token do usuário
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
    console.log('Token:', token);
    req.user = user;
    next();
  });
}

// Requisição para buscar todas as músicas
app.post('/events', async (req, res) => {
  const event = req.body;

  if (event.type === 'GetAllMusicas') {
    console.log('Recebida solicitação para buscar todas as músicas');

    try {
      const musicas = await Musica.find();
      console.log('Músicas encontradas:', musicas);
      res.send(musicas);
    } catch (error) {
      console.error('Erro ao buscar as músicas:', error);
      res.status(500).send({ msg: 'Erro ao buscar as músicas.' });
    }
  } else if (event.type === 'GetUsuarioDetails') {
    const { userId } = event.data;

    console.log('Recebida solicitação para obter detalhes do usuário com ID:', userId);

    try {
      const usuario = await Usuario.findById(userId);
      const musicas = await Musica.find({ userId });

      if (!usuario) {
        console.log('Usuário não encontrado');
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      const usuarioComDetalhes = {
        id: usuario._id,
        fullName: usuario.fullName,
        email: usuario.email,
        description: usuario.description, // Incluído campo descrição
        musicas
      };

      console.log('Detalhes do usuário:', usuarioComDetalhes);
      res.status(200).json(usuarioComDetalhes);
    } catch (error) {
      console.error('Erro ao consultar usuário:', error);
      res.status(500).json({ error: 'Erro ao consultar usuário' });
    }
  } else {
    console.log('Evento inválido');
    res.status(400).json({ message: 'Evento inválido' });
  }
});

app.get('/usuarios/:id', async (req, res) => {
  const userId = req.params.id;

  console.log('Recebida solicitação para obter detalhes do usuário com ID:', userId);

  try {
    const usuario = await Usuario.findById(userId);
    const musicas = await Musica.find({ userId });

    if (!usuario) {
      console.log('Usuário não encontrado');
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const usuarioComDetalhes = {
      id: usuario._id,
      fullName: usuario.fullName,
      email: usuario.email,
      description: usuario.description, // Incluído campo descrição
      musicas
    };

    console.log('Detalhes do usuário:', usuarioComDetalhes);
    res.status(200).json(usuarioComDetalhes);
  } catch (error) {
    console.error('Erro ao consultar usuário:', error);
    res.status(500).json({ error: 'Erro ao consultar usuário' });
  }
});

// Requisição para buscar músicas com título específico
app.get('/musicas', async (req, res) => {
  try {
    const { titulo } = req.query;

    console.log('Recebida solicitação para buscar músicas com título:', titulo);

    const musicas = await Musica.find({ titulo }).exec();
    console.log('Músicas encontradas:', musicas);
    res.status(200).json(musicas);
  } catch (err) {
    console.error('Erro ao consultar músicas:', err);
    res.status(500).json({ error: 'Erro ao consultar músicas' });
  }
});

// Requisição para buscar músicas do usuário pelo ID
app.get('/minhas-musicas', authenticateToken, async (req, res) => {
  const userId = req.user && req.user.id;

  if (!userId) {
    return res.status(400).json({ message: 'O campo userId é obrigatório.' });
  }

  console.log('Recebida solicitação para buscar músicas do usuário com ID:', userId);

  try {
    console.log('UserId:', userId);
    const musicas = await Musica.find({ userId }).populate('userId', 'fullName');
    console.log('Músicas encontradas:', musicas);
    res.status(200).json(musicas);
  } catch (err) {
    console.error('Erro ao consultar músicas:', err);
    res.status(500).json({ error: 'Erro ao consultar músicas' });
  }
});

app.listen(6001, () => console.log('Servidor iniciado na porta 6001.'));
