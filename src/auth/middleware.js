const jwt = require("jsonwebtoken");

const SECRET = process.env.TOKEN_SECRET;

function verifyToken(req, res, next) {

  const header = req.headers["authorization"];
  if (!header) return res.status(403).json({ message: "Token requis" });

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalide" });
  }
}

function authorizeRoles(...roles) {
    return (req, res, next) => {
  
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          message: "Accès refusé pour ce rôle"
        });
      }
  
      next();
    };
  }

module.exports = {verifyToken, authorizeRoles};