const express = require("express");

const router = express.Router();

const {
  post_add_bus_stop,
  post_list,
} = require("../controllers/bus_stop_controllers");

router.post("/add_bus_stop", post_add_bus_stop);

router.post("/list", post_list);

module.exports = router;
