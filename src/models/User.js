const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: Number,
  nom: String,
  prenom: String,
  email: String,
  contact: String,
  role: {
    id: Number,
    label: String
  },
  date_creation: { type: Date, default: Date.now },
  date_update: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
