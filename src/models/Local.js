const mongoose = require("mongoose");

// ======= MODELE LOCAL ETAT =======
const localEtatSchema = new mongoose.Schema(
  {
    _id: { type: Number, required: true },
    libelle: { type: String, required: true, uppercase: true, trim: true }
  },
  { timestamps: { createdAt: "date_creation", updatedAt: "date_update" } }
);

// Nom exact de la collection MongoDB : locals_etat
const LocalEtat = mongoose.model("LocalEtat", localEtatSchema, "locals_etat");

// ======= MODELE LOCAL =======
// Sous-schemas
const loyerSchema = new mongoose.Schema(
  {
    montant: Number,
    date: Date
  },
  { _id: false }
);

const etatSchema = new mongoose.Schema(
  {
    id: Number,
    libelle: String
  },
  { _id: false }
);

const localSchema = new mongoose.Schema(
  {
    _id: Number,
    taille: Number,
    position: String,
    loyer: [loyerSchema],
    etat: etatSchema
  },
  { timestamps: { createdAt: "date_creation", updatedAt: "date_update" } }
);

// Nom exact de la collection MongoDB : locals
const Local = mongoose.model("Local", localSchema, "locals");

module.exports = { Local, LocalEtat };