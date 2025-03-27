const express = require("express");

const router = express.Router();

const {
  post_add_user,
  edit_user,
  authenticate_user,
  get_all_users
} = require("../controllers/motor_user_controllers");

router.post("/add", post_add_user);
router.post("/edit", edit_user);
router.post("/auth", authenticate_user);
router.post("/list", get_all_users);

module.exports = router;
