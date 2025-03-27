const express = require("express");

const router = express.Router();

const {
  post_add_department,
  edit_department,
  authenticate_department,
  get_all_department,
} = require("../controllers/motor_department_controllers");

router.post("/add", post_add_department);
router.post("/edit", edit_department);
router.post("/auth", authenticate_department);
router.post("/list", get_all_department);

module.exports = router;
