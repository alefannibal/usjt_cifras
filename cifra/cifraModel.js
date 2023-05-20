const mongoose = require('mongoose');
const Musica = require('../musica/musicaModel');

const cifraSchema = new mongoose.Schema({
  texto: {
    type: String,
    required: true,
  },
  MusicaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Musica',
    required: true,
  },
});

const Cifra = mongoose.model('Cifra', cifraSchema);

module.exports = Cifra;