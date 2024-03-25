const secureAPI = (req, res, next) => {
  const authorizationpass = process.env.AUTHORIZATION;
  if (req.headers.authorization == authorizationpass) {
    next();
  } else {
    res.send("Invalid API");
  }
};

module.exports = secureAPI;
