const errorHandler = (err, req, res, next) => {
  //create status code from response error code - if there is none, default to code 500 (server error)
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode); //make response status equal to status code we just generated
  res.json({
    //response body (json)
    message: err.message, //self explanatory
    stack: process.env.NODE_ENV === "production" ? null : err.stack, //stacktrace: are we in production? if so, nothing, else, error.stack
  });
};

module.exports = {
  errorHandler,
};
