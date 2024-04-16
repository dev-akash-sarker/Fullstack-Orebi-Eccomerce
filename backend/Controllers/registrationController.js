const User = require("../model/usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

const registrationController = async (req, res) => {
  const { name, email, password } = req.body;
  const saltRounds = 10;
  if (!name || !email || !password) {
    return res.send({ error: "Please Fill the all field" });
  }

  if (password && password.length < 6) {
    return res.send({ error: "Password is too small" });
  } else if (password && password.length > 8) {
    return res.send({ error: "Password is too large" });
  }

  let existingUser = await User.find({ email: email });
  console.log(existingUser);
  if (existingUser.length > 0) {
    return res.send({ error: `${email} already use` });
  } else {
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    bcrypt.hash(password, saltRounds, async function (err, hash) {
      let user = new User({
        name: name,
        email: email,
        password: hash,
        otp: otp,
      });
      user.save();
      // transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "akashsarker210@gmail.com",
          pass: "ltjlnrobzbnrnycx",
        },
      });

      jwt.sign({ email: email }, "ghostmicro", async function (err, token) {
        const info = await transporter.sendMail({
          from: "akashsarker210@gmail.com",
          to: email, // list of receivers
          subject: "Your Verification", // Subject line
          html: `Here is your resend verification <a href="http://localhost:5173/emailverification/${token}">Click here</a>`, // html body
        });
      });

      // const info = await transporter.sendMail({
      //   from: "akashsarker210@gmail.com",
      //   to: email, // list of receivers
      //   subject: "Your Verification", // Subject line
      //   html: `Here is your OTP ${otp}`, // html body
      // });

      res.send({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    });
  }

  // res.send("Password is perfect");
  // console.log(name, email, password);
};

module.exports = registrationController;
