const express = require("express");

const router = express.Router();

const { createEntry, getAllEntries, likeEntry, getAllComments } = require("../controllers/entryController");

router.post("/new", 
 createEntry);
router.get("/", getAllEntries);
router.get("/:id", getAllComments);
router.put("/:id/like", likeEntry);

module.exports = router;
