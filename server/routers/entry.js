const express = require("express");

const router = express.Router();

const { createEntry } = require("../controllers/entryController");
// const { isValidPassword } = require('../middleware/authMiddleware');

router.post("/", createEntry);
router.get("/", checkUserAndCreateSession);

module.exports = router;
