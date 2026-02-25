const mongoose = require("mongoose");

// ======= MODELE COMMANDE STATUT =======
const commandeStatutSchema = new mongoose.Schema(
  {
    // _id: { type: String, required: true },
    libelle: { type: String, required: true, uppercase: true, trim: true },
  },
  { timestamps: { createdAt: "date_creation", updatedAt: "date_update" } },
);

// Nom exact de la collection MongoDB : commandes_statut
const CommandeStatut = mongoose.model(
  "CommandeStatut",
  commandeStatutSchema,
  "commandes_statut",
);

// ======= MODELE COMMANDE =======
const produitSchema = new mongoose.Schema(
  {
    id: String,
    nom: String,
    qte: Number,
    duree: Number,
    prix: Number,
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    id: String,
    nom: String,
    prenom: String,
    email: String,
    contact: String,
  },
  { _id: false },
);

const commandeSchema = new mongoose.Schema(
  {
    // _id: Number,
    id_user: String,
    user: {
      type: userSchema,
    },
    label: String,
    produits: [produitSchema],
    statut: {
      id: String,
      libelle: String,
    },
  },
  {
    timestamps: {
      createdAt: "date_creation",
      updatedAt: "date_update",
    },
  },
);

// Nom exact de la collection MongoDB : commandes
const Commande = mongoose.model("Commande", commandeSchema, "commandes");

module.exports = { Commande, CommandeStatut };
