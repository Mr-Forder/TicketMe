const asyncHandler = require("express-async-handler");

//import user model (schema)
const User = require("../models/userModels");

//import ticket model (schema)
const Ticket = require("../models/ticketModel");

//import note model (schema)
const Note = require("../models/noteModel");

// @desc - Get notes for a specific ticket
//@route - GET api/tickets/:ticketId/notes
//@access - Private
const getNotes = asyncHandler(async (req, res) => {
  //get user using the ID in jwt
  const user = await User.findById(req.user.id); //find by id, passing in user - id grabbed from JWT returned via our auth middleware when user logs in
  if (!user) {
    //if no user found, error
    res.status(401);
    throw new Error("user not found");
  }
  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    //if user linked to ticket is not equal to the user id sent in the request headers...
    res.status(401);
    throw new Error("not authorized");
  }

  const notes = await Note.find({ ticket: req.params.ticketId });

  res.status(200).json(notes);
});

// @desc - create note for a specific ticket
//@route - POST api/tickets/:ticketId/notes
//@access - Private
const addNote = asyncHandler(async (req, res) => {
  //get user using the ID in jwt
  const user = await User.findById(req.user.id); //find by id, passing in user - id grabbed from JWT returned via our auth middleware when user logs in
  if (!user) {
    //if no user found, error
    res.status(401);
    throw new Error("user not found");
  }
  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    //if user linked to ticket is not equal to the user id sent in the request headers...
    res.status(401);
    throw new Error("not authorized");
  }

  const note = await Note.create({
    //create note

    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.user.id,
  });

  res.status(200).json(note); //return note from server
});

module.exports = {
  getNotes,
  addNote,
};
