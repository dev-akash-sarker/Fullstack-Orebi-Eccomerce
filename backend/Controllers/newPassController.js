const User = require("../model/usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let NewPassController = async (req, res) => {
  const { token, password, confirmPassword } = req.body;

  const decoded = jwt.verify(token, "ghostmicro");

  console.log(decoded.email);
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, async function (err, hash) {
    if (password == confirmPassword) {
      await User.findOneAndUpdate({ email: decoded.email }, { password: hash });
      res.status(200).send("password changed");
    }
  });

  //   let findUser = await User.findOne({ email: decoded.email });
  //   console.log("wow0", findUser);

  //   if (!findUser.emailVerified) {
  //     await User.findOneAndUpdate(
  //       {
  //         email: decoded.email,
  //       },
  //       { emailVerified: true }
  //     );
  //     res.send("milse");
  //   } else {
  //     res.send("mily nai");
  //   }
};

module.exports = NewPassController;
