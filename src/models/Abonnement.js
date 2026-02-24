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
    }
  },
  {
    timestamps: {
      createdAt: "date_creation",
      updatedAt: "date_update"
    }
  }
);

module.exports = mongoose.model("Abonnement", abonnementSchema);