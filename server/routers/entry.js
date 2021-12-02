const express = require("express");
const multer = require('multer'); // библиотека для загрузки док-ов локально

const router = express.Router();

const {
  createEntry,
  getAllEntries,
  likeEntry,
} = require("../controllers/entryController");

const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './public/tmp/my_uploads');
    },
    filename(req, file, cb) {
      const regexp = /\.\w{1,5}$/mg // расширение файла с точкой(пр: .jpg )
      cb(null, `${file.fieldname}-${Date.now()}${file.originalname.match(regexp)[0]}`);
    },
  });
  const upload = multer({ storage })

router.post("/new", 
// upload.single('file'),
 createEntry);
router.get("/", getAllEntries);
router.put("/:id/like", likeEntry);

module.exports = router;
