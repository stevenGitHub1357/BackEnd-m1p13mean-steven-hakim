const express = require("express");
const router = express.Router();
const { User, UserRole } = require("../models/User");
const { verifyToken, authorizeRoles } = require("../auth/middleware")

// ----- ROUTES USERS -----
// GET ALL USERS
router.get("/", authorizeRoles("ADMIN"), verifyToken, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET USER BY ID
router.get("/byId/:id", authorizeRoles("USER","ADMIN"), verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE USER
router.post("/create", verifyToken, async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE USER
router.put("/update/:id", verifyToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedUser) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE USER
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json({ message: "Utilisateur supprimé", deletedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ----- ROUTES ROLES DANS LA MEME ROUTE -----
// GET ALL ROLES
router.get("/roles", verifyToken, async (req, res) => {
  try {
    const roles = await UserRole.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ROLE BY ID
router.get("/roles/byId/:id", verifyToken, async (req, res) => {
  try {
    const role = await UserRole.findById(req.params.id);
    if (!role) return res.status(404).json({ message: "Role non trouvé" });
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE ROLE
router.post("/roles/create", verifyToken, async (req, res) => {
  try {
    const newRole = new UserRole(req.body);
    const savedRole = await newRole.save();
    res.status(201).json(savedRole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE ROLE
router.put("/roles/update/:id", verifyToken, async (req, res) => {
  try {
    const updatedRole = await UserRole.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedRole) return res.status(404).json({ message: "Role non trouvé" });
    res.json(updatedRole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE ROLE
router.delete("/roles/delete/:id", verifyToken, async (req, res) => {
  try {
    const deletedRole = await UserRole.findByIdAndDelete(req.params.id);
    if (!deletedRole) return res.status(404).json({ message: "Role non trouvé" });
    res.json({ message: "Role supprimé", deletedRole });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;