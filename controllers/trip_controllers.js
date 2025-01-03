const { Trip } = require("../models/tripModel");
const { Route } = require("../models/route_model");

const post_create_trip = async (req, res, next) => {
  try {
    let body = req.body.trip;
    let trip_path = req.body.trip_path;

    let route_number = body.route_number;

    let route_obj = await Route.findById(route_number);

    if (!route_obj) {
      return res.status(400).json("Invaild Route id");
    }

    let trip_obj = await Trip.create(body);

    if (trip_path === "from_to") {
      route_obj.from_to.push(trip_obj._id);
      await route_obj.save();
      res.status(201).json({ trip_obj, route_obj });
    } else if (trip_path === "to_from") {
      route_obj.to_from.push(trip_obj._id);
      await route_obj.save();
      res.status(201).json({ trip_obj, route_obj });
    } else {
      return res.status(400).json("Invaild TRIP path");
    }
  } catch (e) {
    return res.status(400).json(e);
  }
};

const post_get_trip_list = async (req, res, next) => {
  try {
    let body = req.body;
    let route = await Route.findOne(body).populate([
      {
        path: "from_to",
        model: "Trip",
      },
      {
        path: "to_from",
        model: "Trip",
      },
    ]);

    if (!route) {
      return res.status(400).json("Invaild Route Id");
    }
    return res.status(200).json(route);
  } catch (e) {
    return res.status(400).json(e);
  }
};

const post_indiv_trip_list = async (req, res, next) => {
  try {
    let body = req.body;    
    let trip = await Trip.findOne(body).populate([
      { path: "route_number", model: "route" },
    ]);
    if (!trip) {
      return res.status(400).json("Invaild Trip Id");
    }
    return res.status(200).json(trip);
  } catch (e) {
    return res.status(400).json(e);
  }
};

module.exports = {
  post_create_trip: post_create_trip,
  post_get_trip_list: post_get_trip_list,
  post_indiv_trip_list: post_indiv_trip_list,
};
