const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/Users_Route");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connexion à MongoDB
connectDB();

// Routes
app.use("/users", userRoutes);

// Serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
