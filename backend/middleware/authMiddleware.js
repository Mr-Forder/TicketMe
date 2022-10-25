//import jsonwebtoken
const jwt = require("jsonwebtoken");
//import express async handler
const asyncHandler = require("express-async-handler");
//import user model (schema)
const User = require("../models/userModels");

//protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token; //initialize token variable
  //check for token in request header - jwts are sent in header as 'Bearer <token string>'
  // this checks that the request headers authorization starts with the phrase 'Bearer ...' indicating that it's a jwt
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1]; //split request header into an array - split at space point, so 'Bearer' is one item, and the token itself is the second. This targets the token itself.
      //verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); //use jwt verify method to decode and verify token. takes in token, and our JWT secret from our env. returns an object.
      //get user id from decoded token
      req.user = await User.findById(decoded.id).select("-password"); //set req.user equal to returned value of findById method, taking in id from our decoded object. Then, exclude user password from the user object (we dont' need it)
      next(); //call next Expressjs method, basically a callback telling us to execute something when previous code is done. (in tihs case it'll be the function called when a request is made to this route, when this middleware is applied to it)
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("middleware - not authorized!");
    }
  }
  if (!token) {
    //if there's no token in request header, give error
    throw new Error("middleware - not authorized - no token!");
  }
});

module.exports = { protect };
