const express = require("express");

const router = express.Router();

const { createEntry, getAllEntries, likeEntry } = require("../controllers/entryController");

router.post("/new", createEntry);
router.get("/", getAllEntries);
router.put("/:id/like", likeEntry);


module.exports = router;
