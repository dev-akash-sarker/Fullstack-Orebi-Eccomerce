const User = require("../model/usermodel");
const bcrypt = require("bcrypt");

let loginController = async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email: email });

  if (findUser.email == email) {
    bcrypt.compare(password, findUser.password, function (err, result) {
      if (result == true) {
        res.send({ success: "Login successfull" });
      } else {
        res.send({ error: "Credential Not Matched!" });
      }

      console.log(result);
      // result == true
    });
  } else {
    res.send({ error: "User Not Found" });
  }
};

module.exports = loginController;
