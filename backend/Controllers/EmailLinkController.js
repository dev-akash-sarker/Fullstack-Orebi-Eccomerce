const jwt = require("jsonwebtoken");
const User = require("../model/usermodel");
const nodemailer = require("nodemailer");
let EmailLinkController = async (req, res) => {
  const { email } = req.body;

  const findUser = await User.findOne({ email: email });

  if (findUser.email == email) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "akashsarker210@gmail.com",
        pass: "ltjlnrobzbnrnycx",
      },
    });
    const privateKey = "ghost";
    jwt.sign({ foo: "bar" }, privateKey, async function (err, token) {
      //   console.log(token);
      const info = await transporter
        .sendMail({
          from: "akashsarker210@gmail.com",
          to: email, // list of receivers
          subject: "Your Verification", // Subject line
          html: `Here is your <a href="http://localhost:5173/emailverification/${token}">Email verification link</a>`, // html body
        })
        .then(() => {
          console.log("please check your mail");
        });
    });
    res.status(200).send("Please check your mail");
  } else {
    res.status(400).send("Credential failed");
  }
  console.log("my email is ", email);
};

module.exports = EmailLinkController;
