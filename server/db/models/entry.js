const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, unique: true, required: true },
  img: { type: String},
  category: { type: String, required: true },
  date: { type: Date, default: new Date() },
});

module.exports = mongoose.model("Entry", EntrySchema);
