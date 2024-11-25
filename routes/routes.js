const express = require("express");

const {
  post_add_route,
  find_route_with_id,
  post_add_stops_existing_route,
} = require("../controllers/route_controllers");

const router = express.Router();

router.post("/add", post_add_route);

router.get("/findwithid/:id", find_route_with_id);

router.post("/add_route_bus_stop/:id", post_add_stops_existing_route);

module.exports = router;
