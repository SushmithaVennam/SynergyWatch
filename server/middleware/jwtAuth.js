const jwt = require("jsonwebtoken");

const middleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ error: "No token found, authentication failed..!" });
  }

  try {
    const verifiedUser = jwt.verify(token, "secretToken");
    req.user = verifiedUser;
    next();
  } catch (error) {
    console.log(error.message);
    return res
      .status(401)
      .json({ error: "Invalid token, authentication failed..!" });
  }
};
module.exports = middleware;
