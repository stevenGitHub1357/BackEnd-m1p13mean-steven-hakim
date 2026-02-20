const express = require("express");
const router = express.Router();
const Loyer = require("../models/Loyer");


// GET ALL LOYERS
router.get("/", async (req, res) => {
  try {
    const loyers = await Loyer.find();
    res.json(loyers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET LOYER BY ID
router.get("/:id", async (req, res) => {
  try {
    const loyer = await Loyer.findById(req.params.id);

    if (!loyer)
      return res.status(404).json({ message: "Loyer non trouvé" });

    res.json(loyer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// CREATE LOYER
router.post("/", async (req, res) => {
  try {
    const newLoyer = new Loyer(req.body);
    const savedLoyer = await newLoyer.save();

    res.status(201).json(savedLoyer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// UPDATE LOYER
router.put("/:id", async (req, res) => {
  try {
    const updatedLoyer = await Loyer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedLoyer)
      return res.status(404).json({ message: "Loyer non trouvé" });

    res.json(updatedLoyer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// DELETE LOYER
router.delete("/:id", async (req, res) => {
  try {
    const deletedLoyer = await Loyer.findByIdAndDelete(req.params.id);

    if (!deletedLoyer)
      return res.status(404).json({ message: "Loyer non trouvé" });

    res.json({
      message: "Loyer supprimé",
      deletedLoyer
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;