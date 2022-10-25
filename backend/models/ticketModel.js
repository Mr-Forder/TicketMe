const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, //relate this schema to our user schema
      ref: "User", //refer to our user schema
      required: true,
    },
    product: {
      type: String,
      required: [true, "Please select a product"],
    },
    description: {
      type: String,
      required: [true, "Please add a description of the issue"],
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "open", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
