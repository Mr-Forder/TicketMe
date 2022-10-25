//import express async handler
const asyncHandler = require("express-async-handler");

//import bcrypt
const bcrypt = require("bcryptjs");

//import jsonwebtoken
const jwt = require("jsonwebtoken");

//import user model (schema)
const User = require("../models/userModels");

// @desc -  Register new user
//@route - api/users
//@access - Public
const registerUser = asyncHandler(async (req, res) => {
  //destructure data from request body
  const { name, email, password } = req.body;
  //validate the request
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill out all fields");
  }
  //check if user already exists
  const userExists = await User.findOne({ email }); //find user based on email
  if (userExists) {
    res.status(400);
    throw new Error("User already exists"); //if emaail already exists in db throw error with status 400
  }

  //Hash password
  const salt = await bcrypt.genSalt(10); //generate salt for hash
  const hashedPassword = await bcrypt.hash(password, salt); //hash password, taking in user password and salt

  //create user

  const user = await User.create({
    name,
    email,
    password: hashedPassword, //hashed password as password. if you just put password, pass will be stored as plaintext on db (NO!)
  });

  if (user) {
    //if user now exists...
    res.status(201).json({
      //respond with 201 (all good, thing created) and a json object, containing our new user id, name and email
      _id: user._id, //_id is how mongo stores their ID's
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

// @desc - Login existing user
//@route - api/users/login
//@access - Public
const loginUser = asyncHandler(async (req, res) => {
  //destructure data from request body
  const { email, password } = req.body;
  const user = await User.findOne({ email }); //find our user based on email submitted in body of request
  if (user && (await bcrypt.compare(password, user.password))) {
    //use bcrypt compare method to compare password given with hashed password in db (inside user object in db) to see if they match
    res.status(200).json({
      //respond with 200 (all good) and a json object, containing our existing user id, name and email
      _id: user._id, //_id is how mongo stores their ID's
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("invalid credentials");
  }
});

// @desc - Get current user
//@route - api/users/me
//@access - Private
const getMe = asyncHandler(async (req, res) => {
  const user = {
    //create user object from request data
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  };
  res.status(200).json(user); //return user object - returned when we execute our authMiddleware successsfully (correct token provided in request header)
});

//generate token
const generateToken = (id) => {
  //takes in id as argument

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    //jwt method to sign token, takes in id we just passed in as well as a secret, and a third argument which consists of options.
    expiresIn: "30d", //token expires in 30 days
  }); //final result returned is our json web token, based on id of user logging in/registering
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
