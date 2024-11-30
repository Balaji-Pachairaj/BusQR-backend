const express = require("express");

const router = express.Router();

const {
  post_add_bus_stop,
  post_list,
  post_get_bus_stop_time_and_route,
} = require("../controllers/bus_stop_controllers");

router.post("/add_bus_stop", post_add_bus_stop);

router.post("/list", post_list);

router.post("/list_bus_stop", post_get_bus_stop_time_and_route);

module.exports = router;
