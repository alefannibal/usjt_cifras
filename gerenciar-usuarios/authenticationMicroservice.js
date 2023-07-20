const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { registerUser } = require('./authService');
app.use(cors());

const Usuario = require('./usuarioModel');

const mongoURI = 'mongodb+srv://gustavocord:a99868@cluster0.h3bgjey.mongodb.net/db-musi-code-usuarios';

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexão com o MongoDB estabelecida.'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Gerar e assinar o token de autenticação
function generateAuthToken(user) {
  return jwt.sign(user, 'seu_segredo_do_token', { expiresIn: '1h' });
}

async function authenticateUser(email, password) {
  const user = await Usuario.findOne({ email, password });
  return user;
}

app.post('/register', async (req, res) => {
  const { email, password, confirmPassword, fullName } = req.body;

  try {
    const user = await registerUser(email, password, confirmPassword, fullName);
    const token = generateAuthToken({ id: user._id, email: user.email });

    return res.status(201).json({ message: 'Usuário registrado com sucesso', token });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Recebida solicitação de login para o email:', email);

    const user = await authenticateUser(email, password);

    if (!user) {
      console.log('Credenciais inválidas');
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    console.log('Login bem-sucedido para o usuário:', user.fullName);

    const token = generateAuthToken({ id: user._id, fullName: user.fullName });

    return res.status(200).json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

// Endpoint para obter detalhes de um usuário a partir do seu ID
app.get('/usuarios/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const response = await axios.get(`http://localhost:6001/usuarios/${userId}`);

    if (response.status === 200) {
      const usuario = response.data;
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao obter detalhes do usuário:', error);
    res.status(500).json({ error: 'Erro ao obter detalhes do usuário' });
  }
});

app.post('/usuarios/:id/descricao', async (req, res) => {
  const userId = req.params.id;
  const { description } = req.body;

  try {
    const usuario = await Usuario.findByIdAndUpdate(userId, { description }, { new: true });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json({ message: 'Descrição do usuário atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar descrição do usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar descrição do usuário' });
  }
});

app.listen(7000, () => {
  console.log('Servidor de autenticação iniciado na porta 7000');
});