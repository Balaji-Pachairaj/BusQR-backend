const express = require("express");
const {
  post_create_bus_stop,
  post_create_bus_stop_list,
  get_bus_search,
} = require("../controllers/bus_stop_search_controllers");

const router = express.Router();

router.post("/create_search", post_create_bus_stop);
router.post("/create_search_list", post_create_bus_stop_list);
router.get("/search", get_bus_search);

module.exports = router;
