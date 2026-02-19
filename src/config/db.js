const mongoose = require("mongoose");

const user = process.env.MONGODB_USER;
const mdp  = encodeURIComponent(process.env.MONGODB_MDP);
const db   = process.env.MONGODB_DB;

const MONGO_URI = `mongodb+srv://${user}:${mdp}@dev-cluster.owonqka.mongodb.net/${db}?retryWrites=true&w=majority`;


const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connecté ✅");
  } catch (error) {
    console.error("Erreur MongoDB :", error.message);
    process.exit(1); // arrête le serveur si erreur
  }
};

module.exports = connectDB;
