const { TripBusStopTime } = require("../models/tripBusStopTime");
const { Trip } = require("../models/tripModel");
const { BusStop } = require("../models/busStopModel");

const post_create_trip_bus_stop_time = async (req, res, next) => {
  try {
    let body = req.body;

    let bus_stop = await BusStop.findById(body?.bus_stop);
    if (!bus_stop) {
      return res.status(400).json("Invaild Bus Stop");
    }

    let trip = await Trip.findById(body?.trip);
    if (!trip) {
      return res.status(400).json("Invaild Trip");
    }

    let trip_busStop_time = await TripBusStopTime.create(body);

    bus_stop.list.push(trip_busStop_time._id);
    trip.trip_bus_stop_time_list.push(trip_busStop_time._id);
    await bus_stop.save();
    await trip.save();

    return res.status(201).json({ trip, bus_stop, trip_busStop_time });
  } catch (e) {
    return res.status(400).json(e);
  }
};

const post_list_trip_bus_stop_time = async (req, res, next) => {
  try {
    let body = req.body;

    let trip = await Trip.findOne(body).populate([
      { path: "route_number", model: "route" },
      {
        path: "trip_bus_stop_time_list",
        model: "TripBusStopTime",
        populate: { path: "bus_stop", model: "BusStop" },
      },
    ]);

    if (!trip) {
      return res.status(400).json("Invaild Trip ID");
    }

    return res.status(200).json(trip);
  } catch (e) {
    return res.status(400).json(e);
  }
};

module.exports = {
  post_create_trip_bus_stop_time: post_create_trip_bus_stop_time,
  post_list_trip_bus_stop_time: post_list_trip_bus_stop_time,
};
