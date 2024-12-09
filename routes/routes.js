const express = require("express");

const {
  post_add_route,
  find_route_with_id,
  post_add_stops_existing_route,
  post_list_route,
  get_route_list_search_list,
} = require("../controllers/route_controllers");

const router = express.Router();

router.post("/add", post_add_route);
router.post("/list", post_list_route);

router.get("/findwithid/:id", find_route_with_id);

router.post("/add_route_bus_stop/:id", post_add_stops_existing_route);

router.get("/searchlist", get_route_list_search_list);

module.exports = router;
