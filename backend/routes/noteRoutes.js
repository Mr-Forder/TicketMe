//import express
const express = require("express");

//initialise router
const router = express.Router({ mergeParams: true });
//import route protect middleware
const { protect } = require("../middleware/authMiddleware");

const { getNotes, addNote } = require("../controllers/noteController");

//multiple chained requests - get notes and create note
router.route("/").get(protect, getNotes).post(protect, addNote);

//export router module
module.exports = router;
