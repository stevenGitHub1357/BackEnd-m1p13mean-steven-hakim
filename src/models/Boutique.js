const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id_user: {
      type: String,
      required: true
    },
    nom: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    prenom: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    contact: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    }
  },
  { _id: false }
);

const localSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: true,
      trim: true
    },
    loyer: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    }
  },
  { _id: false }
);

const abonnementSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true
    },
    libelle: {
      type: String,
      required: true,
      trim: true
    },
    montant: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    }
  },
  { _id: false }
);

const boutiqueSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: String,
    //   required: true
    // },
    nom: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    logo: {
      type: String
    },
    fond: {
      type: String
    },
    users: {
      type: [userSchema],
      default: []
    },
    local: {
      type: [localSchema],
      default: []
    },
    abonnement: {
      type: [abonnementSchema],
      default: []
    }
  },
  {
    timestamps: {
      createdAt: "date_creation",
      updatedAt: "date_update"
    }
  }
);

module.exports = mongoose.model("Boutique", boutiqueSchema);