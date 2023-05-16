const mongoose = require('mongoose');

const cifraSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  cifra: { type: String, required: true },
});

const Cifra = mongoose.model('Cifra', cifraSchema);

module.exports = Cifra;