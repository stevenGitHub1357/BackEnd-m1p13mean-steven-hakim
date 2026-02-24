const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const router = express.Router();

const SECRET = process.env.TOKEN_SECRET; // dans .env

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({status: 0, message: "Utilisateur introuvable" });

    const validPassword = password === user.password;
    if (!validPassword) return res.status(401).json({status: 0, message: "Mot de passe incorrect" });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role.label
      },
      SECRET,
      { expiresIn: "30d" }
    );

    res.json({status: 1, user, token });

  } catch (err) {
    res.status(500).json({status: 0, message: err.message });
    console.log({status: 0, message: err.message })
  }
});

module.exports = router;