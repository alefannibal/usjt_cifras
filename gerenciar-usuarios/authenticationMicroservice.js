const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

app.use(cors());
const { registerUser, authenticateUser } = require('./authService');

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
    const user = await authenticateUser(email, password);

    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = generateAuthToken({ id: user._id, fullName: user.fullName });

    return res.status(200).json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

app.listen(7000, () => {
  console.log('Servidor de autenticação iniciado na porta 7000');
});
