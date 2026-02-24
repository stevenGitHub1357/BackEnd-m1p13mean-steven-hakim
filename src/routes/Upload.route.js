const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { verifyToken, authorizeRoles } = require("../auth/middleware")

// Configurer Multer + Cloudinary pour accepter tous les formats
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Cloudinary-m1p13mean-steven-hakim", // dossier dans Cloudinary
    format: async (req, file) => {
      // garde le format original du fichier
      const originalExtension = file.originalname.split(".").pop();
      return originalExtension;
    },
  },
});

const parser = multer({ storage: storage });

// Route pour uploader
router.post("/", verifyToken, parser.single("file"), async (req, res) => {
  try {
    // req.file contient les infos du fichier uploadé
    res.json({
      message: "Fichier uploadé avec succès ✅",
      url: req.file.path,           // URL publique sur Cloudinary
      originalName: req.file.originalname, // nom original du fichier
      format: req.file.mimetype,    // type MIME du fichier
      size: req.file.size           // taille en bytes
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'upload", error });
  }
});

module.exports = router;
