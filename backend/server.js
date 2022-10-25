//import express
const express = require("express");
const colors = require("colors");
//import dotenv
const dotenv = require("dotenv").config();
//import our custom error handler
const { errorHandler } = require("./middleware/errorMiddleWare");
//import mongoose connection to db
const connectDB = require("./config/db");
//create a port for server to run on
const PORT = process.env.PORT || 8000;

//connect to database
connectDB();

//initialise express
const app = express();

// Enable CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

//add middleware
app.use(express.json()); //add json body parser
app.use(express.urlencoded({ extended: false })); //add urlencoded

//listen on specific port, added log to explain what it's doing to user

//use get method to fetch - takes in req, res - res will provide a response to anyone attempting to access the server at the endpoint given.
app.get("/", (req, res) => {
  res.status(201).json({ message: "welcome to the LocalReviews API" });
});

//connect api endpoint users to our user registration route js file
app.use("/api/users", require("./routes/userRoutes"));
//same, but with our ticket routes
app.use("/api/tickets", require("./routes/ticketRoutes"));
//use our custom error handler (imported above)
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
