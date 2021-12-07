const mongoose = require("mongoose");

const MapSchema = new mongoose.Schema({
  category: { type: String, required: true },
  description: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  img: { type: String },
  coordinates: { type: Array, unique: true },
  date: { type: Date },
  confirmed: {type: Boolean, default: false },
  adress: { type: String },
});

module.exports = mongoose.model("Map", MapSchema);
