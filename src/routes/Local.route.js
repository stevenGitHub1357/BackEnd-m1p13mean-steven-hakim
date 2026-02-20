const express = require("express");
const router = express.Router();
const { Local, LocalEtat } = require("../models/Local");

// ----- ROUTES LOCALS -----
// GET ALL LOCALS
router.get("/", async (req, res) => {
  try {
    const locals = await Local.find();
    res.json(locals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET LOCAL BY ID
router.get("/byId/:id", async (req, res) => {
  try {
    const local = await Local.findById(req.params.id);
    if (!local) return res.status(404).json({ message: "Local non trouvé" });
    res.json(local);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE LOCAL
router.post("/create", async (req, res) => {
  try {
    const newLocal = new Local(req.body);
    const savedLocal = await newLocal.save();
    res.status(201).json(savedLocal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE LOCAL
router.put("/update/:id", async (req, res) => {
  try {
    const updatedLocal = await Local.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedLocal) return res.status(404).json({ message: "Local non trouvé" });
    res.json(updatedLocal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE LOCAL
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedLocal = await Local.findByIdAndDelete(req.params.id);
    if (!deletedLocal) return res.status(404).json({ message: "Local non trouvé" });
    res.json({ message: "Local supprimé", deletedLocal });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ----- ROUTES ETATS -----
// GET ALL ETATS
router.get("/etats", async (req, res) => {
  try {
    const etats = await LocalEtat.find();
    res.json(etats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ETAT BY ID
router.get("/etats/byId/:id", async (req, res) => {
  try {
    const etat = await LocalEtat.findById(req.params.id);
    if (!etat) return res.status(404).json({ message: "Etat non trouvé" });
    res.json(etat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE ETAT
router.post("/etats/create", async (req, res) => {
  try {
    const newEtat = new LocalEtat(req.body);
    const savedEtat = await newEtat.save();
    res.status(201).json(savedEtat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE ETAT
router.put("/etats/update/:id", async (req, res) => {
  try {
    const updatedEtat = await LocalEtat.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedEtat) return res.status(404).json({ message: "Etat non trouvé" });
    res.json(updatedEtat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE ETAT
router.delete("/etats/delete/:id", async (req, res) => {
  try {
    const deletedEtat = await LocalEtat.findByIdAndDelete(req.params.id);
    if (!deletedEtat) return res.status(404).json({ message: "Etat non trouvé" });
    res.json({ message: "Etat supprimé", deletedEtat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;