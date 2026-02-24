const mongoose = require("mongoose");

const loyerSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: Number,
    //   required: true
    // },
    id_boutique: {
      type: Number,
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
    }
  },
  {
    timestamps: {
      createdAt: "date_creation",
      updatedAt: "date_update"
    }
  }
);

module.exports = mongoose.model("Loyer", loyerSchema);