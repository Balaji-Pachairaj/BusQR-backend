const express = require("express");

const router = express.Router();

const {
  post_add_unit,
  edit_unit,
  authenticate_unit,
  get_all_unit,
} = require("../controllers/motor_unit_controllers");

router.post("/add", post_add_unit);
router.post("/edit", edit_unit);
router.post("/auth", authenticate_unit);
router.post("/list", get_all_unit);

module.exports = router;
