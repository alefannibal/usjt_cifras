const mongoose = require('mongoose');

const musicaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  letra: {
    type: String,
    required: true,
  },
  autor: {
    type: String,
    required: true,
  },
  cifra: {
    type: String,
    default: '',
  },
});

const Musica = mongoose.model('Musica', musicaSchema);

module.exports = Musica;