const User = require("../model/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let loginController = async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email: email });

  console.log(findUser);

  if (findUser.email == email) {
    bcrypt.compare(password, findUser.password, function (err, result) {
      var token = jwt.sign(
        { id: findUser._id, email: findUser.email },
        "shhhh",
        { expiresIn: 60 * 60 }
      );
      console.log(findUser);

      if (result == true) {
        res.send({
          success: "Login successfull",
          token: token,
          email: findUser.email,
          name: findUser.name,
          role: findUser.role,
        });
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
