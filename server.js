const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Importer la fonction de connexion
const connectDB = require("./src/config/db");

// Modèles
const User = require("./src/models/User");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// 🔹 Connexion à MongoDB Atlas
connectDB();

// ----------------- CRUD ROUTES -----------------
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
  res.json(user);
});

app.post("/users", async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.status(201).json(newUser);
});

app.put("/users/:id", async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { ...req.body, date_update: Date.now() },
    { new: true }
  );
  if (!updatedUser) return res.status(404).json({ message: "Utilisateur non trouvé" });
  res.json(updatedUser);
});

app.delete("/users/:id", async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) return res.status(404).json({ message: "Utilisateur non trouvé" });
  res.json({ message: "Utilisateur supprimé", deletedUser });
});

// ----------------- SERVER -----------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));
