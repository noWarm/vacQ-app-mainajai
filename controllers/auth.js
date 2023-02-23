 const User = require('../models/User');

 exports.register = (req, res, next) => {
    res.status(200).json({success: true});
 }