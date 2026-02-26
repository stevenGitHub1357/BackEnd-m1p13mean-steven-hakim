function isCommandeExpiree(commande) {
  if (!commande.produits || commande.produits.length === 0) return false;
  
  const dateCreation = new Date(commande.date_creation);

  const dureeMax = Math.max(
    ...commande.produits.map(p => p.duree || 0)
  );

  const dateExpiration = new Date(dateCreation);
  dateExpiration.setDate(dateExpiration.getDate() + dureeMax);

  return new Date() > dateExpiration;
}

module.exports = { isCommandeExpiree };