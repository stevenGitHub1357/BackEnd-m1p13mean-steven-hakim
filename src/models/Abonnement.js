const mongoose = require("mongoose");

const prixSchema = new mongoose.Schema(
  {
    montant: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    }
  },
  { _id: false }
);

const abonnementSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: Number,
    //   required: true
    // },
    label: {
      type: String,
      required: true,
      trim: true
    },
    prix: {
      type: [prixSchema],
      default: []
    },
    description: {
      type: String,
      trim: true
    },
    priorite: {
      type: Number,
      required: true
    },
    duree: {
      type: String,
      required: true,
      default : "10"
    }
  },
  {
    timestamps: {
      createdAt: "date_creation",
      updatedAt: "date_update"
    }
  }
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
const abonnementDemandeSchema = new mongoose.Schema(
  {  
    boutique: boutiqueSchema,
    user: userSchema,
    abonnement: abonnementSchema,
    statut: {
      type: String,
      enum: ["EN_ATTENTE", "VALIDER", "REFUSE"],
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

const AbonnementDemande = mongoose.model("AbonnementDemande", abonnementDemandeSchema, "abonnements_demande");
const Abonnement = mongoose.model("Abonnement", abonnementSchema, "abonnements");

module.exports = {Abonnement, AbonnementDemande};