const Route = require("../models/route_model").Route;

const post_add_route = async (req, res, next) => {
  try {
    let body = req.body;
    let response = await Route.create(body);
    console.log(response);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json(e);
  }
};

const post_add_stops_existing_route = async (req, res, next) => {
  try {
    let body = req.body;
    let id = req.params.id;
    let route = await Route.findById(id);
    if (route) {
      // adding the stop here

      let response = await route.updateOne({ $push: { list_of_stops: body } });
      return res.status(200).json(response);
    } else {
      return res.status(400).json({ id: "invaild" });
    }
  } catch (e) {
    return res.status(400).json(e);
  }
};

const find_route_with_id = async (req, res, next) => {
  try {
    let id = req.params.id;
    let obj = await Route.findById(id);
    if (obj) {
      return res.status(200).json(obj);
    } else {
      return res.status(400).json({ id: "invaild" });
    }
  } catch (e) {
    return res.status(400).json(e);
  }
};

module.exports = {
  post_add_route: post_add_route,
  find_route_with_id: find_route_with_id,
  post_add_stops_existing_route: post_add_stops_existing_route,
};
