 const User = require('../models/User');

 exports.register = async (req, res, next) => {
    try {
        // recall that we use the json parser
        const {name, email, password, role} = req.body;

        // create the user
        const user = await User.create({
            name,
            email,
            password,
            role
        });

        // create the token and return it too
        const token = user.getSignedJwtToken();

        res.status(200).json({success:true, token});
    } catch(err) {
        res.status(400).json({success:false});
        console.log(err.stack);
    }
 }

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
     const token = user.getSignedJwtToken();

     res.status(200).json({success:true, token});
    // sendTokenResponse(user, 200, res);
  };