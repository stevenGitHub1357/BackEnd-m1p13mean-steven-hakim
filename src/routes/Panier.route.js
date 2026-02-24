const express = require("express");
const router = express.Router();
const Panier = require("../models/Panier");
const { verifyToken, authorizeRoles } = require("../auth/middleware")


// GET ALL PANIERS
router.get("/", verifyToken, async (req, res) => {
  try {
    const paniers = await Panier.find();
    res.json(paniers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET PANIER BY ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const panier = await Panier.findById(req.params.id);

    if (!panier)
      return res.status(404).json({ message: "Panier non trouvé" });

    res.json(panier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// CREATE PANIER
router.post("/", verifyToken, async (req, res) => {
  try {
    const newPanier = new Panier(req.body);
    const savedPanier = await newPanier.save();

    res.status(201).json(savedPanier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// UPDATE PANIER
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedPanier = await Panier.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPanier)
      return res.status(404).json({ message: "Panier non trouvé" });

    res.json(updatedPanier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// DELETE PANIER
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedPanier = await Panier.findByIdAndDelete(req.params.id);

    if (!deletedPanier)
      return res.status(404).json({ message: "Panier non trouvé" });

    res.json({
      message: "Panier supprimé",
      deletedPanier
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;