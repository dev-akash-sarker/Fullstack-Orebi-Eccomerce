const secureAPI = (req, res, next) => {
  const authorizationpass = process.env.AUTHORIZATION;
  if (req.headers.authorization == authorizationpass) {
    next();
  } else {
    res.status(401);
    res.send("Invalid API");
  }
};

module.exports = secureAPI;
