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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
});

const Musica = mongoose.model('Musica', musicaSchema);

module.exports = Musica;