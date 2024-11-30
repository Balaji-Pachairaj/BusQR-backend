const { BusStop } = require("../models/busStopModel");
const { TripBusStopTime } = require("../models/tripBusStopTime");
const { Trip } = require("../models/tripModel");

const post_add_bus_stop = async (req, res, next) => {
  try {
    let body = req.body;
    let bus_stop = await BusStop.create(body);
    return res.status(201).json(bus_stop);
  } catch (e) {
    return res.status(400).json(e);
  }
};

const post_list = async (req, res, next) => {
  try {
    let body = req?.body;
    let list = await BusStop.find(body);
    if (list) {
      return res.status(200).json(list);
    } else {
      return res.status(200).json([]);
    }
  } catch (e) {
    return res.status(400).json(e);
  }
};

function sortArrayByKey(array, key, ascending = true) {
  return array.sort((a, b) => {
    if (a[key] < b[key]) return ascending ? -1 : 1;
    if (a[key] > b[key]) return ascending ? 1 : -1;
    return 0;
  });
}

const post_get_bus_stop_time_and_route = async (req, res, next) => {
  try {
    let body = req.body;
    let bus_stop = await BusStop.findOne(body)
      .populate([
        {
          path: "list",
          model: "TripBusStopTime",
          populate: [
            {
              path: "trip",
              model: "Trip",
              populate: [
                {
                  path: "route_number",
                  model: "route",
                },
                {
                  path: "trip_bus_stop_time_list",
                  model: "TripBusStopTime",
                },
              ],
            },
          ],
        },
      ])
      .select("-bus_stop_search_list")
      .lean();

    if (!bus_stop) {
      return res.status(400).json("Invaild Bus ");
    }

    for (let i = 0; i < bus_stop?.list?.length; i++) {
      let trip = bus_stop?.list[i].trip;

      for (let j = 0; j < trip.trip_bus_stop_time_list?.length; j++) {
        let trip_bus_stop_time_list = trip.trip_bus_stop_time_list[j];

        let trip_bus_stop_time_list_obj = await TripBusStopTime.findById(
          trip_bus_stop_time_list
        ).lean();

        trip_bus_stop_time_list_obj.bus_stop = await BusStop.findById(
          trip_bus_stop_time_list_obj?.bus_stop
        )
          .select(" -bus_stop_search_list")
          .lean();

        bus_stop.list[i].trip.trip_bus_stop_time_list[j] =
          trip_bus_stop_time_list_obj;
      }
    }

    let return_busObj = bus_stop;

    return_busObj.list = sortArrayByKey([...return_busObj.list], "time");
    console.log(return_busObj);

    for (let i = 0; i < return_busObj.list.length; i++) {
      return_busObj.list[i].trip.trip_bus_stop_time_list = sortArrayByKey(
        [...return_busObj.list[i].trip.trip_bus_stop_time_list],
        "time"
      );
      console.log(return_busObj.list[i].trip.trip_bus_stop_time_list);
    }

    return res.status(200).json(bus_stop);
  } catch (e) {
    return res.status(400).json(e);
  }
};

const put_edit_bus_stop = async (req, res, next) => {};

module.exports = {
  post_add_bus_stop: post_add_bus_stop,
  post_list,
  post_get_bus_stop_time_and_route: post_get_bus_stop_time_and_route,
};
