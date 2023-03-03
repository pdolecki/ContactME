const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  name: { type: String },
  phoneNumber: { type: String },
  email: { type: String },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
