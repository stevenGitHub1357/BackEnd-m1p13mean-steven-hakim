const express = require("express");
const router = express.Router();
const { Produit, ProduitEtat, ProduitCategorie } = require("../models/Produit");
const { verifyToken, authorizeRoles } = require("../auth/middleware")

// ----- ROUTES PRODUITS -----
// GET ALL PRODUITS
router.get("/", verifyToken, async (req, res) => {
  try {
    const produits = await Produit.find();
    res.json(produits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET PRODUIT BY ID
router.get("/byId/:id", verifyToken, async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.id);
    if (!produit) return res.status(404).json({ message: "Produit non trouvé" });
    res.json(produit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE PRODUIT
router.post("/create", verifyToken, async (req, res) => {
  try {
    const newProduit = new Produit(req.body);
    const savedProduit = await newProduit.save();
    res.status(201).json(savedProduit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE PRODUIT
router.put("/update/:id", verifyToken, async (req, res) => {
  try {
    const updatedProduit = await Produit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedProduit) return res.status(404).json({ message: "Produit non trouvé" });
    res.json(updatedProduit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE PRODUIT
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const deletedProduit = await Produit.findByIdAndDelete(req.params.id);
    if (!deletedProduit) return res.status(404).json({ message: "Produit non trouvé" });
    res.json({ message: "Produit supprimé", deletedProduit });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ----- ROUTES ETATS -----
// GET ALL ETATS
router.get("/etats", verifyToken, async (req, res) => {
  try {
    const etats = await ProduitEtat.find();
    res.json(etats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CRUD ETATS
router.get("/etats/byId/:id", verifyToken, async (req, res) => {
  try {
    const etat = await ProduitEtat.findById(req.params.id);
    if (!etat) return res.status(404).json({ message: "Etat non trouvé" });
    res.json(etat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/etats/create", verifyToken, async (req, res) => {
  try {
    const newEtat = new ProduitEtat(req.body);
    const savedEtat = await newEtat.save();
    res.status(201).json(savedEtat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/etats/update/:id", verifyToken, async (req, res) => {
  try {
    const updatedEtat = await ProduitEtat.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedEtat) return res.status(404).json({ message: "Etat non trouvé" });
    res.json(updatedEtat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/etats/delete/:id", verifyToken, async (req, res) => {
  try {
    const deletedEtat = await ProduitEtat.findByIdAndDelete(req.params.id);
    if (!deletedEtat) return res.status(404).json({ message: "Etat non trouvé" });
    res.json({ message: "Etat supprimé", deletedEtat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ----- ROUTES CATEGORIES -----
router.get("/categories", verifyToken, async (req, res) => {
  try {
    const categories = await ProduitCategorie.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CRUD CATEGORIES
router.get("/categories/byId/:id", verifyToken, async (req, res) => {
  try {
    const categorie = await ProduitCategorie.findById(req.params.id);
    if (!categorie) return res.status(404).json({ message: "Categorie non trouvé" });
    res.json(categorie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/categories/create", verifyToken, async (req, res) => {
  try {
    const newCategorie = new ProduitCategorie(req.body);
    const savedCategorie = await newCategorie.save();
    res.status(201).json(savedCategorie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/categories/update/:id", verifyToken, async (req, res) => {
  try {
    const updatedCategorie = await ProduitCategorie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedCategorie) return res.status(404).json({ message: "Categorie non trouvé" });
    res.json(updatedCategorie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/categories/delete/:id", verifyToken, async (req, res) => {
  try {
    const deletedCategorie = await ProduitCategorie.findByIdAndDelete(req.params.id);
    if (!deletedCategorie) return res.status(404).json({ message: "Categorie non trouvé" });
    res.json({ message: "Categorie supprimé", deletedCategorie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;