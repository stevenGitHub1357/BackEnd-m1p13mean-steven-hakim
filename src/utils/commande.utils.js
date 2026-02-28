const { Commande } = require("../models/Commande");

const nettoyerCommandesExpirees = async () => {
  // const commandes = await Commande.find();
  const commandes = await Commande.find({
    "statut.libelle": "ENVOYER",
  });
  const maintenant = new Date();

  for (const commande of commandes) {
    // Filtrer produits non expirés
    const produitsValides = commande.produits.filter((p) => {
      const dateExpiration = new Date(commande.date_creation);
      dateExpiration.setDate(dateExpiration.getDate() + p.duree);

      return dateExpiration > maintenant;
    });

    // 🔥 CAS 1 : Tous les produits sont expirés
    if (produitsValides.length === 0) {
      commande.statut = {
        ...commande.statut,
        libelle: "EXPIRE",
      };
      await commande.save();
    }
    // 🔥 CAS 2 : Certains produits expirés seulement
    else if (produitsValides.length !== commande.produits.length) {
      commande.produits = produitsValides;
      await commande.save();
    }
  }
};

module.exports = { nettoyerCommandesExpirees };
