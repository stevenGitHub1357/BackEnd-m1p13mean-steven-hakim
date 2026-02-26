const express = require("express");
const router = express.Router();
const {Abonnement, AbonnementDemande} = require("../models/Abonnement");
const { verifyToken, authorizeRoles } = require("../auth/middleware")


// GET ALL ABONNEMENTS
router.get("/", verifyToken, async (req, res) => {
  try {
    const abonnements = await Abonnement.find();
    res.json(abonnements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET ABONNEMENT BY ID
router.get("/ById/:id", verifyToken, async (req, res) => {
  try {
    const abonnement = await Abonnement.findById(req.params.id);

    if (!abonnement)
      return res.status(404).json({ message: "Abonnement non trouvé" });

    res.json(abonnement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// CREATE ABONNEMENT
router.post("/create", verifyToken, async (req, res) => {
  try {
    const newAbonnement = new Abonnement(req.body);
    const savedAbonnement = await newAbonnement.save();

    res.status(201).json(savedAbonnement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// UPDATE ABONNEMENT
router.put("/update/:id", verifyToken, async (req, res) => {
  try {
    const updatedAbonnement = await Abonnement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAbonnement)
      return res.status(404).json({ message: "Abonnement non trouvé" });

    res.json(updatedAbonnement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// DELETE ABONNEMENT
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const deletedAbonnement = await Abonnement.findByIdAndDelete(req.params.id);

    if (!deletedAbonnement)
      return res.status(404).json({ message: "Abonnement non trouvé" });

    res.json({
      message: "Abonnement supprimé",
      deletedAbonnement
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.get("/demande", verifyToken, async (req, res) => {
  try {
    const abonnement = await AbonnementDemande.find();
    res.json(abonnement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// =======================
// GET ABONNEMENT DEMANDE BY ID
// =======================
router.get("/demande/ById/:id", verifyToken, async (req, res) => {
  try {
    const abonnementDemande = await AbonnementDemande.findById(req.params.id);

    if (!abonnementDemande)
      return res.status(404).json({ message: "Abonnement demande non trouvé" });

    res.json(abonnementDemande);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// =======================
// CREATE ABONNEMENT DEMANDE
// =======================
router.post("/demande/create", verifyToken, async (req, res) => {
  try {
    const newAbonnementDemande = new AbonnementDemande(req.body);
    const savedAbonnementDemande = await newAbonnementDemande.save();

    res.status(201).json(savedAbonnementDemande);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// =======================
// UPDATE ABONNEMENT DEMANDE
// =======================
router.put("/demande/update/:id", verifyToken, async (req, res) => {
  try {
    const updatedAbonnementDemande = await AbonnementDemande.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAbonnementDemande)
      return res.status(404).json({ message: "Abonnement demande non trouvé" });

    res.json(updatedAbonnementDemande);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// =======================
// DELETE ABONNEMENT DEMANDE
// =======================
router.delete("/demande/delete/:id", verifyToken, async (req, res) => {
  try {
    const deletedAbonnementDemande = await AbonnementDemande.findByIdAndDelete(req.params.id);

    if (!deletedAbonnementDemande)
      return res.status(404).json({ message: "Abonnement demande non trouvé" });

    res.json({
      message: "Abonnement demande supprimé",
      deletedAbonnementDemande
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;