/*const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT, (err, user) => { 
            if (err) res.status(403).json("Token is not valid!");
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated!");
    }
};  

const verifyTokenAndAuthorization = (req, res, next) => {   
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not alowed to do that!"); 
        }
    }); 
};

const verifyTokenAndAdmin = (req, res, next) => {   
    verifyToken(req, res, () => {
        if (req.user.isAdmin) { 
            next();
        } else {    
            res.status(403).json("You are not alowed to do that!");
        }
    }); 
};  

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };             
*/

const jwt = require("jsonwebtoken");

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization; // Use standard Authorization header
  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"
    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Token is not valid!", error: err.message });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: "You are not authenticated!" });
  }
};

// Middleware to verify token and user authorization
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      return next();
    } else {
      return res
        .status(403)
        .json({ message: "You are not allowed to do that!" });
    }
  });
};

// Middleware to verify token and admin privileges
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      return next();
    } else {
      return res
        .status(403)
        .json({ message: "You are not allowed to do that!" });
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
