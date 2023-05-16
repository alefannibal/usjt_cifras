const users = [];

const Usuario = require('./usuarioModel');

async function registerUser(email, password, confirmPassword, fullName) {
  if (password !== confirmPassword) {
    throw new Error('As senhas não coincidem');
  }

  const existingUser = await Usuario.findOne({ email }); // Verifique se o usuário já existe no banco de dados
  if (existingUser) {
    throw new Error('Usuário já está registrado');
  }

  const newUser = new Usuario({ email, password, fullName }); // Crie uma nova instância do modelo Usuario
  await newUser.save(); // Salve o novo usuário no banco de dados
}

async function authenticateUser(email, password) {
  const user = await Usuario.findOne({ email, password });
  return user !== null;
}

module.exports = { registerUser, authenticateUser };