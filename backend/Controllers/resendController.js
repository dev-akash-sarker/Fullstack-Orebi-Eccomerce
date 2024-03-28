const User = require("../model/usermodel");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const resendController = async (req, res) => {
  const { email } = req.body;
  const findUser = await User.findOne({ email: email });
  console.log(findUser);
  const otp = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  if (findUser.email == email) {
    await User.findOneAndUpdate({ email: email }, { otp: otp });
    // transporter
  }

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
    subject: "Your resend email", // Subject line
    html: `Here is your OTP ${otp}`, // html body
  });
  console.log("my email", email);
};

module.exports = resendController;
