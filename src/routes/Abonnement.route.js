const express = require("express");
const router = express.Router();
const Abonnement = require("../models/Abonnement");
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

module.exports = router;