const User = require("../model/usermodel");

let otpController = async (req, res) => {
  const { email, otp } = req.body;
  console.log("email", email);
  console.log("otp", otp);

  const findUser = await User.findOne({ email: email });
  console.log(findUser.otp);

  if (!findUser.emailVerified && findUser.otp == otp) {
    await User.findOneAndUpdate(
      { email: email },
      { otp: "", emailVerified: true }
    );
    res.send("milse");
  } else {
    res.send("mily nai");
  }
};

module.exports = otpController;
