const mongoose = require("mongoose");

const produitSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true
    },
    nom: {
      type: String,
      required: true,
      trim: true
    },
    qte: {
      type: Number,
      required: true,
      min: 1
    },
    duree: {
      type: Number,
      required: true,
      min: 1
    }
  },
  { _id: false }
);

const panierSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true
    },
    id_user: {
      type: Number,
      required: true
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

module.exports = mongoose.model("Panier", panierSchema);