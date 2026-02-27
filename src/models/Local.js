const mongoose = require("mongoose");

// ======= MODELE LOCAL ETAT =======
const localEtatSchema = new mongoose.Schema(
  {
    // _id: { type: String, required: true },
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
    id: String,
    libelle: String
  },
  { _id: false }
);

const localSchema = new mongoose.Schema(
  {
    // _id: Number,
    taille: Number,
    position: String,
    loyer: [loyerSchema],
    etat: etatSchema
  },
  { timestamps: { createdAt: "date_creation", updatedAt: "date_update" } }
);


const localSchemaDemande = new mongoose.Schema(
  {
    id: String,
    taille: Number,
    position: String,
    loyer: [loyerSchema],
    etat: etatSchema
  },
  { timestamps: { createdAt: "date_creation", updatedAt: "date_update" } }
);

// ===== Sous-schema Boutique =====
const boutiqueSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, trim: true },
    nom: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    logo: { type: String },
    fond: { type: String }
  },
  { _id: false }
);


// ===== Sous-schema User =====
const userSchema = new mongoose.Schema(
  {
    id_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    contact: { type: String },
    email: { type: String }
  },
  { _id: false }
);


// ===== Schema principal =====
const localDemandeSchema = new mongoose.Schema(
  {  
    boutique: boutiqueSchema,
    user: userSchema,
    local: localSchemaDemande,
    statut: {
      type: String,
      enum: ["EN_ATTENTE", "VALIDE", "REFUSE"],
      default: "EN_ATTENTE"
    } 
  },
  {
    timestamps: {
      createdAt: "date_creation",
      updatedAt: "date_update"
    }
  }
);

// Nom exact de la collection MongoDB : locals
const Local = mongoose.model("Local", localSchema, "locals");
const LocalDemande = mongoose.model("LocalDemande", localDemandeSchema, "locals_demande");

module.exports = { Local, LocalEtat, LocalDemande };