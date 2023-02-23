// pseudocode
// if no token, deny access
// if provided token is valid, grant access then do next()
// if provided token is invalid, deny access

const User = require("../models/User");
const jwt = require('jsonwebtoken');


// exports.protect TODO: what is this exports. syntax

exports.protect = async(req, res, next) => {
    let token;  // currently undefined
    
    // TODO: what is this .startsWith ?
    // a: probably header is "Bearer 483jnsiwoaefi3"
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({success:false, message:'Not authorize to access this route'});
    }
    
    try {
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        
        // TODO: what is this req.user
        // a: probably req is passed as a pointer?
        // and that it will be used via next() ?
        req.user = await User.findById(decoded.id);
        
        next();
    } catch(err) {
        console.log(err.stack);
        return res.status(401).json({success:false, message:'Not authorize to access this route'});
    }
}

