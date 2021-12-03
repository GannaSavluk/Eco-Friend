const Map = require("../db/models/map");

exports.getMap = async (req, res) => {
  try {
    const map = await Map.find().populate("author");
    res.json(map);
  } catch (err) {
    console.error("Err message:", err.message);
    console.error("Err code", err);
  }

  res.status(200).end();
};
