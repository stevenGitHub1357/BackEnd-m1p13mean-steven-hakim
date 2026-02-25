const mongoose = require("mongoose");

// ======= MODELE PRODUIT ETAT =======
const produitEtatSchema = new mongoose.Schema(
  {
    // _id: { type: String, required: true },
    libelle: { type: String, required: true, uppercase: true, trim: true }
  },
  { timestamps: { createdAt: "date_creation", updatedAt: "date_update" } }
);

const ProduitEtat = mongoose.model("ProduitEtat", produitEtatSchema, "produits_etat");

// ======= MODELE PRODUIT CATEGORIE =======
const produitCategorieSchema = new mongoose.Schema(
  {
    // _id: { type: String, required: true },
    label: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    base: {
      id: String,
      label: String
    }
  },
  { timestamps: { createdAt: "date_creation", updatedAt: "date_update" } }
);

const ProduitCategorie = mongoose.model(
  "ProduitCategorie",
  produitCategorieSchema,
  "produits_categorie"
);

// ======= MODELE PRODUIT =======
// Sous-schemas pour images, prix, solde, categories, etat
const imageSchema = new mongoose.Schema(
  {
    message: String,
    url: String,
    originalName: String,
    format: String,
    size: Number
  },
  { _id: false }
);

const prixSchema = new mongoose.Schema(
  {
    date: Date,
    montant: Number
  },
  { _id: false }
);

const soldeSchema = new mongoose.Schema(
  {
    debut: Date,
    fin: Date,
    pourcentage: Number
  },
  { _id: false }
);

const categorieSchema = new mongoose.Schema(
  {
    id: String,
    label: String
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

const boutiqueSchema = new mongoose.Schema(
  {
    id: String,
    nom: String,
    description: String,
    logo: String,
  },
  { _id: false }
);


const produitSchema = new mongoose.Schema(
  {
    // _id: String,
    id_boutique: String,
    label: String,
    description: String,
    qte: Number,
    images: [imageSchema],
    prix: [prixSchema],
    solde: [soldeSchema],
    categories: [categorieSchema],
    etat: etatSchema,
    boutique: boutiqueSchema,
    duree_panier: Number
  },
  {
    timestamps: { createdAt: "date_creation", updatedAt: "date_update" }
  }
);

const Produit = mongoose.model("Produit", produitSchema, "produits");

module.exports = { Produit, ProduitEtat, ProduitCategorie };