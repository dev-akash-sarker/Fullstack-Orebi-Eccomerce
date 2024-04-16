const User = require("../model/usermodel");
const jwt = require("jsonwebtoken");
let LinkController = async (req, res) => {
  const { token } = req.body;
  const decoded = jwt.verify(token, "ghostmicro");
  console.log(decoded.email);

  let findUser = await User.findOne({ email: decoded.email });
  console.log("wow0", findUser);

  if (!findUser.emailVerified) {
    await User.findOneAndUpdate(
      {
        email: decoded.email,
      },
      { emailVerified: true }
    );
    res.send("milse");
  } else {
    res.send("mily nai");
  }
};

module.exports = LinkController;
