const Usuario = require('./usuarioModel');

async function registerUser(email, password, confirmPassword, fullName) {
  if (password !== confirmPassword) {
    throw new Error('As senhas não coincidem');
  }

  const existingUser = await Usuario.findOne({ email });
  if (existingUser) {
    throw new Error('Usuário já está registrado');
  }

  const newUser = new Usuario({ email, password, fullName });
  await newUser.save();

  return newUser; // Retornar o usuário recém-registrado
}

async function authenticateUser(email, password) {
  const user = await Usuario.findOne({ email, password });
  return user !== null;
}

module.exports = { registerUser, authenticateUser };