const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send("A token is required for authentication.");

  try {
    const user = jwt.verify(token, process.env.SECRET_KEY);
    req.user = user;
    return next();
  } catch (error) {
    res.status(401).send("Invalid token.");
  }
}

module.exports = auth;
