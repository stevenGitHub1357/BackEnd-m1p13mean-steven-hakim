const express = require("express");
const router = express.Router();
const { Commande, CommandeStatut } = require("../models/Commande");
const { verifyToken, authorizeRoles } = require("../auth/middleware");

// ----- ROUTES COMMANDES -----
// GET ALL COMMANDES
router.get("/", verifyToken, async (req, res) => {
  try {
    const commandes = await Commande.find().populate("statut");
    res.json(commandes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET COMMANDE BY ID
router.get("/byId/:id", verifyToken, async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id).populate("statut");
    if (!commande)
      return res.status(404).json({ message: "Commande non trouvée" });
    res.json(commande);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE COMMANDE
router.post("/create", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
   console.log("BODY REÇU :", req.body);
    console.log("USER :", req.user);
    const newCommande = new Commande({
      ...req.body,
      userId: userId,
    });
    const savedCommande = await newCommande.save();
    res.status(201).json(savedCommande);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE COMMANDE
router.put("/update/:id", verifyToken, async (req, res) => {
  try {
    const updatedCommande = await Commande.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!updatedCommande)
      return res.status(404).json({ message: "Commande non trouvée" });
    res.json(updatedCommande);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE COMMANDE
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const deletedCommande = await Commande.findByIdAndDelete(req.params.id);
    if (!deletedCommande)
      return res.status(404).json({ message: "Commande non trouvée" });
    res.json({ message: "Commande supprimée", deletedCommande });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH COMMANDE : CHANGER STATUT
router.patch("/update/:id/statut", verifyToken, async (req, res) => {
  try {
    let statutId = Number(req.body.statutId);
    if (isNaN(statutId)) {
      return res.status(400).json({ message: "statutId doit être un nombre" });
    }

    const statut = await CommandeStatut.findById(statutId);
    if (!statut) return res.status(404).json({ message: "Statut invalide" });

    const updatedCommande = await Commande.findByIdAndUpdate(
      req.params.id,
      { statut: statutId },
      { new: true },
    );

    if (!updatedCommande)
      return res.status(404).json({ message: "Commande non trouvée" });

    res.json(updatedCommande);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ----- ROUTES STATUTS -----
// GET ALL STATUTS
router.get("/statuts", verifyToken, async (req, res) => {
  try {
    const statuts = await CommandeStatut.find();
    res.json(statuts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET STATUT BY ID
router.get("/statuts/byId/:id", verifyToken, async (req, res) => {
  try {
    const statut = await CommandeStatut.findById(req.params.id);
    if (!statut) return res.status(404).json({ message: "Statut non trouvé" });
    res.json(statut);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE STATUT
router.post("/statuts/create", verifyToken, async (req, res) => {
  try {
    const newStatut = new CommandeStatut(req.body);
    const savedStatut = await newStatut.save();
    res.status(201).json(savedStatut);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE STATUT
router.put("/statuts/update/:id", verifyToken, async (req, res) => {
  try {
    const updatedStatut = await CommandeStatut.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!updatedStatut)
      return res.status(404).json({ message: "Statut non trouvé" });
    res.json(updatedStatut);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE STATUT
router.delete("/statuts/delete/:id", verifyToken, async (req, res) => {
  try {
    const deletedStatut = await CommandeStatut.findByIdAndDelete(req.params.id);
    if (!deletedStatut)
      return res.status(404).json({ message: "Statut non trouvé" });
    res.json({ message: "Statut supprimé", deletedStatut });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
