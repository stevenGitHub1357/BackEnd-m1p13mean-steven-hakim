const mongoose = require("mongoose");

const produitSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true
    },
    nom: {
      type: String,
      trim: true
    },
    qte: {
      type: Number,
      required: true,
      min: 1
    },
    duree: {
      type: Number,
      min: 1
    }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    id: String,
    nom: String,
    prenom: String,
    email: String,
    contact: String,
  },
  { _id: false }
);

const panierSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: Number,
    //   required: true
    // },
    id_user: {
      type: String,
      required: true
    },
    user: {
      type: userSchema
    },
    label: {
      type: String,
      required: true,
      trim: true
    },
    produits: {
      type: [produitSchema],
      default: []
    }
  },
  {
    timestamps: {
      createdAt: "date_creation",
      updatedAt: "date_update"
    }
  }
);

module.exports = mongoose.model("Panier", panierSchema, 'paniers');