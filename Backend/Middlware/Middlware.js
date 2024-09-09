import jwt from 'jsonwebtoken';

const SECRET_KEY = 'imad'; // Remplace par ta clé secrète

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // Si aucun token, réponse 401

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // Si le token est invalide, réponse 403
    req.user = user;
    next(); // Passe au prochain middleware ou route
  });
};
