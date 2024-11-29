const express = require("express");

const router = express.Router();

const { post_create_trip } = require("../controllers/trip_controllers");

router.post("/create", post_create_trip);

module.exports = router;
