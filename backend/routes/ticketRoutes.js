//import express
const express = require("express");

//initialise router
const router = express.Router();
//import route protect middleware
const { protect } = require("../middleware/authMiddleware");

//Reroute into note router
const noteRouter = require("./noteRoutes");
router.use("/:ticketId/notes", noteRouter);

const {
  createTicket,
  updateTicket,
  deleteTicket,
  getTickets,
  getTicket,
} = require("../controllers/ticketController");

//ticket route - chaining allows for POST (creating tickets) and GET (view user's tickets) -route is defined in server.js file
router.route("/").get(protect, getTickets).post(protect, createTicket);

//get single ticket route - get single ticket, update and delete single ticket
router
  .route("/:id")
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);

//export router module
module.exports = router;
