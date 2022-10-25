const asyncHandler = require("express-async-handler");

//import user model (schema)
const User = require("../models/userModels");

//import ticket model (schema)
const Ticket = require("../models/ticketModel");

// @desc - Get user tickets
//@route - GET api/tickets
//@access - Private
const getTickets = asyncHandler(async (req, res) => {
  //get user using the ID in jwt
  const user = await User.findById(req.user.id); //find by id, passing in user - id grabbed from JWT returned via our auth middleware when user logs in
  if (!user) {
    //if no user found, error
    res.status(401);
    throw new Error("user not found");
  }
  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

// @desc - Get single ticket
//@route - GET api/tickets/:id
//@access - Private
const getTicket = asyncHandler(async (req, res) => {
  //get user using the ID in jwt
  const user = await User.findById(req.user.id); //find by id, passing in user - id grabbed from JWT returned via our auth middleware when user logs in
  if (!user) {
    //if no user found, error
    res.status(401);
    throw new Error("user not found");
  }
  const ticket = await Ticket.findById(req.params.id); //find ticket by request id
  if (!ticket) {
    res.status(404);
    throw new Error("ticket not found");
  }

  //limit access to ticket - make it so only the user who's created the ticket can actually view it
  if (ticket.user.toString() !== req.user.id) {
    //if the user id associated with the ticket isn't equal to the user id from the request
    res.status(401); //chuck an error
    throw new Error("You are not authorised to view this");
  }

  res.status(200).json(ticket);
});

// @desc - delete single ticket
//@route - DELETE api/tickets/:id
//@access - Private
const deleteTicket = asyncHandler(async (req, res) => {
  //get user using the ID in jwt
  const user = await User.findById(req.user.id); //find by id, passing in user - id grabbed from JWT returned via our auth middleware when user logs in
  if (!user) {
    //if no user found, error
    res.status(401);
    throw new Error("user not found");
  }
  const ticket = await Ticket.findById(req.params.id); //find ticket by request id
  if (!ticket) {
    res.status(404);
    throw new Error("ticket not found");
  }

  //limit access to ticket - make it so only the user who's created the ticket can actually view it
  if (ticket.user.toString() !== req.user.id) {
    //if the user id associated with the ticket isn't equal to the user id from the request
    res.status(401); //chuck an error
    throw new Error("You are not authorised to view this");
  }

  //actually delete the ticket
  await ticket.remove(); // simply call mongo method to remove ticket from db
  res.status(200).json({ success: true });
});

// @desc - update single ticket
//@route - PUT api/tickets/:id
//@access - Private
const updateTicket = asyncHandler(async (req, res) => {
  //get user using the ID in jwt
  const user = await User.findById(req.user.id); //find by id, passing in user - id grabbed from JWT returned via our auth middleware when user logs in
  if (!user) {
    //if no user found, error
    res.status(401);
    throw new Error("user not found");
  }
  const ticket = await Ticket.findById(req.params.id); //find ticket by request id
  if (!ticket) {
    res.status(404);
    throw new Error("ticket not found");
  }

  //limit access to ticket - make it so only the user who's created the ticket can actually view it
  if (ticket.user.toString() !== req.user.id) {
    //if the user id associated with the ticket isn't equal to the user id from the request
    res.status(401); //chuck an error
    throw new Error("You are not authorised to view this");
  }

  //actually update the ticket
  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  ); // use fidnbyidandupdate method, taking in request id and body (user edit)
  //final argument, an options object - set new to true, so if ticket isnt already there, create it.
  res.status(200).json(updatedTicket); //finally, server will respond with updated ticket
});

// @desc - Create new ticket
//@route - POST api/tickets/
//@access - Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body; //add more fields as you wish in schema to inc functionality
  if (!product || !description) {
    res.status(400); //if no product or description is given by user, error
    throw new Error("Please add a product and a description");
  }

  //get user using the ID in jwt
  const user = await User.findById(req.user.id); //find by id, passing in user - id grabbed from JWT returned via our auth middleware when user logs in
  if (!user) {
    //if no user found, error
    res.status(401);
    throw new Error("user not found");
  }

  //create actual ticket
  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  });

  res.status(201).json(ticket);
});

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  updateTicket,
  deleteTicket,
};
