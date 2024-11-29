const express = require("express");

const router = express.Router();

const {
  post_create_trip_bus_stop_time,
} = require("../controllers/trip_bus_stop_controllers");

router.post("/create", post_create_trip_bus_stop_time);

module.exports = router;
