const express = require("express");

const router = express.Router();

const {

  createUserAndSession,
  checkUserAndCreateSession,
  destroySession,
  deleteUser,
  editUserProfilePicture,
} = require("../controllers/authController");
// const { isValidPassword } = require('../middleware/authMiddleware');

router.post("/signup", createUserAndSession);
router.post("/signin", checkUserAndCreateSession);
router.post("/logout", destroySession);
// router.delete("/admin/:id", deleteUser);
router.delete("/:id", deleteUser);
router.post("/img", editUserProfilePicture);

router.get("/check", (req, res) => {
  // req.session.maxAge = 1000 //TODO использовать, если будем делать "запомнить меня" при регестрации
  console.log("req.session", req.session);
  if (req.session.user.role === 1) res.json(req.session.user);
  if (req.session.user.role === 0) res.json(req.session.user);
  else res.json({});
});

module.exports = router;
