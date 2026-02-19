const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configurer Multer + Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Cloudinary-m1p13mean-steven-hakim", // dossier dans Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "gif"],
  },
});

const parser = multer({ storage: storage });

// Route pour uploader
router.post("/", parser.single("file"), async (req, res) => {
  try {
    // req.file contient les infos du fichier uploadé
    res.json({
      message: "Fichier uploadé avec succès ✅",
      url: req.file.path, // URL publique sur Cloudinary
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'upload", error });
  }
});

module.exports = router;
