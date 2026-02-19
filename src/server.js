require("dotenv").config(); 
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/Users.route");
const uploadRoutes = require("./routes/Upload.route");

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

// Serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
