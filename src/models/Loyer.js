const mongoose = require("mongoose");

const boutiqueSchema = new mongoose.Schema(
  {
    id: String,
    nom: String,
    description: String,
    logo: String,
  },
  { _id: false }
);

const loyerSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: Number,
    //   required: true
    // },
    id_boutique: {
      type: String,
      required: true
    },
    montant: {
      type: Number,
      required: true,
      min: 0
    },
    montant_payer: {
      type: Number,
      required: true,
      min: 0
    },
    mois: {
      type: Number,
      required: true,
      min: 1,
      max: 12
    },
    annee: {
      type: Number,
      required: true,
      min: 2000
    },
    boutique: boutiqueSchema,
  },
  {
    timestamps: {
      createdAt: "date_creation",
      updatedAt: "date_update"
    }
  }
);

module.exports = mongoose.model("Loyer", loyerSchema);