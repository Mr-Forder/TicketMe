//import express
const express = require("express");
//initialise router
const router = express.Router();
//import logic from userController.js
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

//import route protect middleware
const { protect } = require("../middleware/authMiddleware");

//user registration route
router.post("/", registerUser);
//user login route
router.post("/login", loginUser);
//user route
router.get("/me", protect, getMe); //added middleware, will run protect, then getMe on request

//export router module
module.exports = router;
