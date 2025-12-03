const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).send({ message: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, "secretKey123");
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send({ message: "Invalid token" });
  }
}

module.exports = authMiddleware;
