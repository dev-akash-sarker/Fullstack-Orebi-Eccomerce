const User = require("../model/usermodel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const ForgetPassController = async (req, res) => {
  const { email } = req.body;

  let existingUser = await User.find({ email: email });
  console.log(existingUser);
  if (existingUser.length > 0) {
    console.log("this is my mail: ", existingUser);
    jwt.sign(
      { email: email },
      "ghostmicro",
      async function (err, token) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "akashsarker210@gmail.com",
            pass: "ltjlnrobzbnrnycx",
          },
        });
        const info = await transporter.sendMail({
          from: "akashsarker210@gmail.com",
          to: email, // list of receivers
          subject: "Your password change link", // Subject line
          html: `<a href="http://localhost:5173/newpassword/${token}">Click here</a>`, // html body
        });
      },
      "secret",
      { expiresIn: 60 * 3 }
    );
  } else {
    res.send({ error: "user not found" });
  }

  // res.send("Password is perfect");
  // console.log(name, email, password);
};

module.exports = ForgetPassController;
