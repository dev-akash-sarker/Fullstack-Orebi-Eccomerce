var jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    res.send("Token Required");
  } else {
    jwt.verify(token, "shhhh", function (err, decoded) {
      console.log(decoded);
      if (decoded) {
        next();
      } else {
        res.send("Valid token required");
      }
    });
    // console.log(decoded.email);
  }
};

module.exports = verifyToken;
