const Entry = require("../db/models/entry");

exports.createEntry = async (req, res, next) => {
  try {
    const { values } = req.body;
    const newEntry = await Entry.create({
      //   title: values.title,
      text: values.text,
      category: state.category,
      img: values.img,
      user_id: req.session.user.id,
    });
    console.log("created ENTRY---->", newEntry);

  } catch (err) {
    console.error("Err message:", err.message);
    console.error("Err code", err);
  }

  res.json(newEntry);
  res.status(200).end();
};

// exports.getAllNotes = async (req, res) => {
//     try {
//         const notes = await Note.find({ user_id: req.session.user.id })

//         const sortedNotes = notes.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
//         console.log(sortedNotes)
//         res.json(sortedNotes)
//     } catch (err) {
//         console.error('Err message:', err.message);
//         console.error('Err code', err);
//     }

//     res.status(200).end();
// };

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

// exports.editNote = async (req, res) => {
//     try {
//         const { note, newText } = req.body;
//         const updatedNote = await Note.updateOne({ _id: note.id }, { text: newText })
//         res.json({ message: 'ok' })
//     } catch (err) {
//         console.error('Err message:', err.message);
//         console.error('Err code', err);
//     }
//     res.status(200).end();
// };
