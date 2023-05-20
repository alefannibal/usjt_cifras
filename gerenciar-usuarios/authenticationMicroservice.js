const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
const { registerUser, authenticateUser } = require('./authService'); // Correção no nome do arquivo

const mongoURI = 'mongodb://localhost:27017/db-musi-code-usuarios';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexão com o MongoDB estabelecida.'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Configurar o body-parser para lidar com solicitações POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rota de registro de usuário
app.post('/register', async (req, res) => {
  const { email, password, confirmPassword, fullName } = req.body;

  try {
    await registerUser(email, password, confirmPassword, fullName); // Uso do await para aguardar a conclusão da função
    return res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// Rota de login de usuário
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authenticateUser(email, password);

    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    return res.status(200).json({ message: 'Login bem-sucedido' });
  } catch (error) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

// Iniciar o servidor
app.listen(7000, () => {
  console.log('Servidor de autenticação iniciado na porta 7000');
});