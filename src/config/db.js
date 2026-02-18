const mongoose = require("mongoose");

// Remplace "user", "mdp" et "nomDeTaDB" par tes valeurs
const user = "steven_db_user";
const mdp =  "98ts9q1UmfkvLSXf";
const db = "m1p13mean-steven-hakim";
const MONGO_URI = "mongodb+srv://"+user+":"+mdp+"@dev-cluster.owonqka.mongodb.net/"+db+"?retryWrites=true&w=majority";

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
