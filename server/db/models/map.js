const mongoose = require("mongoose");

const MapSchema = new mongoose.Schema({
  category: { type: String, required: true },
  description: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  imgs: { type: Array },
  coordinates: { type: Array, unique: true },
  date: { type: Date, default: new Date() },
  adress: { type: String },
});

module.exports = mongoose.model("Map", MapSchema);
