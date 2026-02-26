const express = require("express");
const router = express.Router();
const Boutique = require("../models/Boutique");
const { verifyToken, authorizeRoles } = require("../auth/middleware")


// GET ALL BOUTIQUES
router.get("/", verifyToken, async (req, res) => {
  try {
    const boutiques = await Boutique.find();
    res.json(boutiques);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET BOUTIQUE BY ID
router.get("/ById/:id", verifyToken, async (req, res) => {
  try {
    const boutique = await Boutique.findById(req.params.id);

    if (!boutique)
      return res.status(404).json({ message: "Boutique non trouvée" });

    res.json(boutique);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// CREATE BOUTIQUE
router.post("/create", verifyToken, async (req, res) => {
  try {
    const newBoutique = new Boutique(req.body);
    const savedBoutique = await newBoutique.save();

    res.status(201).json(savedBoutique);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// UPDATE BOUTIQUE
router.put("/update/:id", verifyToken, async (req, res) => {
  try {
    const updatedBoutique = await Boutique.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBoutique)
      return res.status(404).json({ message: "Boutique non trouvée" });

    res.json(updatedBoutique);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// DELETE BOUTIQUE
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const deletedBoutique = await Boutique.findByIdAndDelete(req.params.id);

    if (!deletedBoutique)
      return res.status(404).json({ message: "Boutique non trouvée" });

    res.json({
      message: "Boutique supprimée",
      deletedBoutique
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;