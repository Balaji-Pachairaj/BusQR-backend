const express = require("express");

const router = express.Router();

const {
  post_create_trip,
  post_get_trip_list,
  post_indiv_trip_list,
} = require("../controllers/trip_controllers");

router.post("/create", post_create_trip);
router.post("/list", post_get_trip_list);
router.post("/indivlist", post_indiv_trip_list);

module.exports = router;
