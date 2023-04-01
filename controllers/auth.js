const User = require("../models/User");

exports.register = async (req, res, next) => {
  try {
    // recall that we use the json parser
    const { name, email, password, role } = req.body;

    // create the user
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    // create the token and return it too
    // const token = user.getSignedJwtToken();
    // res.status(200).json({success:true, token});

    sendTokenResponse(user, 200, res);

  } catch (err) {
    res.status(400).json({ success: false });
    console.log(err.stack);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  // Validate email & password
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide email and password" });
  }
  // Check for user
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(400).json({ success: false, msg: "Invalid credentials" });
  }
  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(400).json({ success: false, msg: "Invalid credentials" });
  }

  // create the token and return it too
  //  const token = user.getSignedJwtToken();
  //  res.status(200).json({success:true, token});

  sendTokenResponse(user, 200, res);
};

// This function is wrapper for the previous
// naive getSignedJwtToken + res.status(200,...);
// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000 // millisecond
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true; //TODO: why is this!?!?
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};


//TODO: its use for the signed in user to get info about himself
exports.getMe = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user,
  });
};

//@desc     Log user out / clear cookie
//@route    GET /api/v1/auth/logout
//@access   Private
exports.logout=async(req,res,next)=>{
  res.cookie('token','none',{
      expires: new Date(Date.now()+ 10*1000),
      httpOnly:true
});
  res.status(200).json({
      success:true,
data:{} });
}