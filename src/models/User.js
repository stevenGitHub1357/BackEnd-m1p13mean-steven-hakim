const mongoose = require("mongoose");

// ======= MODELE USER ROLE =======
const userRoleSchema = new mongoose.Schema(
  {
    _id: { type: Number, required: true },
    label: { type: String, required: true, uppercase: true, trim: true },
    description: String,
    priorite: Number
  },
  { timestamps: { createdAt: "date_creation", updatedAt: "date_update" } }
);

// Nom exact de la collection MongoDB : users_role
const UserRole = mongoose.model("UserRole", userRoleSchema, "users_role");

// ======= MODELE USER =======
// Sous-schema role
const roleSchema = new mongoose.Schema(
  {
    id: Number,
    label: String
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    _id: Number,
    nom: String,
    prenom: String,
    email: String,
    password:String,
    contact: String,
    role: roleSchema
  },
  { timestamps: { createdAt: "date_creation", updatedAt: "date_update" } }
);
// Nom exact de la collection MongoDB : users
const User = mongoose.model("User", userSchema, "users");

module.exports = { User, UserRole };