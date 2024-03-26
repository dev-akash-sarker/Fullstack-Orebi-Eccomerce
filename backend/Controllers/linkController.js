const User = require("../model/usermodel");

let linkController = async (req, res) => {
  const { email, otp } = req.body;

  let findUser = await User.findOne({ email: email });
  console.log(findUser);
  res.send(findUser);
  if (!findUser.verify && findUser.otp == otp) {
    await User.findOneAndUpdate(
      {
        email: email,
      },
      { otp: "", verify: true }
    );
    res.send("milse");
  } else {
    res.send("mily nai");
  }
};

module.exports = linkController;
