require("dotenv").config(); 
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const connectDB = require("./config/db");
const uploadRoutes = require("./routes/Upload.route");
const userRoutes = require("./routes/User.route");
const commandeRoutes = require("./routes/Commande.route")
const stockRoutes = require("./routes/Stock.route")
const produitRoutes = require("./routes/Produit.route")
const localRoutes = require("./routes/Local.route")

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Connexion à MongoDB
connectDB();

// Upload
app.use("/upload", uploadRoutes);

// Routes
app.use("/users", userRoutes);
app.use("/commandes", commandeRoutes);
app.use("/stocks", stockRoutes);
app.use("/produits", produitRoutes);
app.use("/locals", localRoutes);

// Serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
