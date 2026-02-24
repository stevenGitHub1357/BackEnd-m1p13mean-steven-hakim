const express = require("express");
const router = express.Router();
const { Stock, TypeStock } = require("../models/Stock");
const { verifyToken, authorizeRoles } = require("../auth/middleware")

// ----- ROUTES STOCKS -----
// GET ALL STOCKS
router.get("/" , verifyToken, async (req, res) => {
  try {
    const stocks = await Stock.find().populate("type");
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET STOCK BY ID
router.get("/byId/:id" , verifyToken, async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id).populate("type");
    if (!stock) return res.status(404).json({ message: "Stock non trouvé" });
    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE STOCK
router.post("/create" , verifyToken, async (req, res) => {
  try {
    const newStock = new Stock(req.body);
    const savedStock = await newStock.save();
    res.status(201).json(savedStock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE STOCK
router.put("/update/:id" , verifyToken, async (req, res) => {
  try {
    const updatedStock = await Stock.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedStock) return res.status(404).json({ message: "Stock non trouvé" });
    res.json(updatedStock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE STOCK
router.delete("/delete/:id" , verifyToken, async (req, res) => {
  try {
    const deletedStock = await Stock.findByIdAndDelete(req.params.id);
    if (!deletedStock) return res.status(404).json({ message: "Stock non trouvé" });
    res.json({ message: "Stock supprimé", deletedStock });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ----- ROUTES TYPES DE STOCK -----
// GET ALL TYPES
router.get("/types" , verifyToken, async (req, res) => {
  try {
    const types = await TypeStock.find();
    res.json(types);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET TYPE BY ID
router.get("/types/byId/:id" , verifyToken, async (req, res) => {
  try {
    const type = await TypeStock.findById(req.params.id);
    if (!type) return res.status(404).json({ message: "Type non trouvé" });
    res.json(type);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE TYPE
router.post("/types/create" , verifyToken, async (req, res) => {
  try {
    const newType = new TypeStock(req.body);
    const savedType = await newType.save();
    res.status(201).json(savedType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE TYPE
router.put("/types/update/:id" , verifyToken, async (req, res) => {
  try {
    const updatedType = await TypeStock.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedType) return res.status(404).json({ message: "Type non trouvé" });
    res.json(updatedType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE TYPE
router.delete("/types/delete/:id" , verifyToken, async (req, res) => {
  try {
    const deletedType = await TypeStock.findByIdAndDelete(req.params.id);
    if (!deletedType) return res.status(404).json({ message: "Type non trouvé" });
    res.json({ message: "Type supprimé", deletedType });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;