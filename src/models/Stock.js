const mongoose = require("mongoose");

// ======= MODELE TYPE STOCK =======
const typeStockSchema = new mongoose.Schema(
  {
    // _id: { type: String, required: true },
    libelle: { type: String, required: true, uppercase: true, trim: true }
  },
  { timestamps: { createdAt: "date_creation", updatedAt: "date_update" } }
);

// Nom exact de la collection MongoDB : stocks_type
const TypeStock = mongoose.model("TypeStock", typeStockSchema, "stocks_type");

// ======= MODELE STOCK =======
// Sous-schéma pour le type
const typeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    label: { type: String, required: true, uppercase: true, trim: true }
  },
  { _id: false }
);

const stockSchema = new mongoose.Schema(
  {
    // _id: Number,
    id_produit: Number,
    type: typeSchema
  },
  {
    timestamps: {
      createdAt: "date_creation",
      updatedAt: "date_update"
    }
  }
);

// Nom exact de la collection MongoDB : stocks
const Stock = mongoose.model("Stock", stockSchema, "stocks");

module.exports = { Stock, TypeStock };