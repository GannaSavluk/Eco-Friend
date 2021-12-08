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

exports.setNewMarker = async (req, res) => {
  console.log(req.body);
  try {
    await Map.create(req.body);
    res.status(200).end();
  } catch (error) {
    console.error("Error message:", error.message);
    console.error("Error code", error);
    res.status(500).end();
  }
};

exports.editMapPoint = async (req, res) => {
  try {
    const { values, link } = req.body;
    const id = req.params.id;
    console.log("id------>>>>>", id);
    await Map.updateOne(
      { _id: id },
      {
        confirmed: true,
      }
    );
    const updatedPoint = await Map.findOne({ _id: id }).populate("author");
    console.log("updatedPoint", updatedPoint);
    res.json(updatedPoint);
  } catch (err) {
    console.error("Err message:", err.message);
    console.error("Err code", err);
  }
  res.status(200).end();
};

exports.deletePoint = async (req, res) => {
  const id = req.params.id;
  try {
    await Map.deleteOne({ _id: id });
  } catch (err) {
    console.error("Err message:", err.message);
    console.error("Err code", err);
  }
  res.json({ message: "ok" });
  res.status(200).end();
};

exports.addStar = async (req, res) => {
  const pointId = req.params.id;
  const { userId } = req.body;
  try {
    const point = await Map.findOne({ _id: pointId });
    const findStar = point.stars.indexOf(userId);
    if (findStar === -1) {
      point.stars.push(userId);
    } else {
      point.stars.splice(findStar, 1);
    }
    await Map.updateOne({ _id: pointId }, { stars: point.stars });
  } catch (err) {
    console.error("Err message:", err.message);
    console.error("Err code", err);
  }
  res.json({ message: "ok" });
  res.status(200).end();
};
