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

const post_create_trip_bus_stop_time_with_list = async (req, res, next) => {
  try {
    let body = req.body;

    let array = [];

    let trip = await Trip.findById(body?.trip);
    if (!trip) {
      return res.status(400).json("Invaild Trip");
    }

    if (body?.bus_stop?.length !== body?.time?.length) {
      return res.status(400).json("Invalid Input");
    }

    for (let i = 0; i < body?.bus_stop?.length; i++) {
      let bus_stop = await BusStop.findById(body?.bus_stop[i]);
      if (!bus_stop) {
        return res.status(400).json("Invaild Bus Stop");
      }

      let trip_busStop_time = await TripBusStopTime.create({
        trip: trip._id,
        time: body?.time[i],
        bus_stop: bus_stop,
      });

      array.push(trip_busStop_time);

      bus_stop.list.push(trip_busStop_time._id);
      trip.trip_bus_stop_time_list.push(trip_busStop_time._id);
      await bus_stop.save();
    }

    await trip.save();
    return res.status(201).json({ trip, array });
  } catch (e) {
    return res.status(400).json(e);
  }
};

function sortObjectsByKey(arr, key, ascending = true) {
  return arr.sort((a, b) => {
    if (a[key] < b[key]) return ascending ? -1 : 1;
    if (a[key] > b[key]) return ascending ? 1 : -1;
    return 0; // a[key] === b[key]
  });
}

const post_list_trip_bus_stop_time = async (req, res, next) => {
  try {
    let body = req.body;

    let trip = await Trip.findOne(body)
      .populate([
        { path: "route_number", model: "route" },
        {
          path: "trip_bus_stop_time_list",
          model: "TripBusStopTime",
          populate: { path: "bus_stop", model: "BusStop" },
        },
      ])
      .lean();

    if (!trip) {
      return res.status(400).json("Invaild Trip ID");
    }

    trip = {
      ...trip,
      trip_bus_stop_time_list: sortObjectsByKey(
        trip.trip_bus_stop_time_list,
        "time"
      ),
    };

    return res.status(200).json(trip);
  } catch (e) {
    return res.status(400).json(e);
  }
};

module.exports = {
  post_create_trip_bus_stop_time: post_create_trip_bus_stop_time,
  post_list_trip_bus_stop_time: post_list_trip_bus_stop_time,
  post_create_trip_bus_stop_time_with_list:
    post_create_trip_bus_stop_time_with_list,
};
