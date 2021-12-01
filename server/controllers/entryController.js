const Entry = require("../db/models/entry");

exports.createEntry = async (req, res, next) => {
  try {
    const { values } = req.body;
    const newEntry = await Entry.create({
      text: values.text,
      category: values.category,
      img: values?.img,
      author: req.session.user.id,
      date: new Date(),
    });
    console.log("created ENTRY---->", newEntry);
    res.json(newEntry);
  } catch (err) {
    console.error("Err message:", err.message);
    console.error("Err code", err);
  }

  res.status(200).end();
};

exports.getAllEntries = async (req, res) => {
  try {
    const entries = await Entry.find().populate("author");

    const sortedEntries = entries.sort(
      (a, b) => Date.parse(b.date) - Date.parse(a.date)
    );
    console.log(sortedEntries);
    res.json(sortedEntries);
  } catch (err) {
    console.error("Err message:", err.message);
    console.error("Err code", err);
  }

  res.status(200).end();
};

// exports.deleteOneNote = async (req, res) => {
//     console.log('---------req.params.id----', req.params.id)
//     try {

//         await Note.deleteOne({ _id: req.params.id })

//     } catch (err) {
//         console.error('Err message:', err.message);
//         console.error('Err code', err);
//     }
//     res.json({ message: 'ok' })
//     res.status(200).end();
// };

exports.likeEntry = async (req, res) => {
  const entryId = req.params.id;
  const userId = req.session.user.id;
  try {
    const entry = await Entry.findOne({ _id: entryId });
    const likeIndex = entry.likes.indexOf(userId);

    likeIndex === -1
      ? entry.likes.push(userId)
      : entry.likes.splice(likeIndex, 1);

    await Entry.updateOne({ _id: entryId }, { likes: entry.likes });
    res.json({ message: "ok" });
  } catch (err) {
    console.error("Err message:", err.message);
    console.error("Err code", err);
  }
  res.status(200).end();
};
