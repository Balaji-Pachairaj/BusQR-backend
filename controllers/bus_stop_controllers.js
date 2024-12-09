const { BusStop } = require("../models/busStopModel");
const { TripBusStopTime } = require("../models/tripBusStopTime");
const { Trip } = require("../models/tripModel");
const { DraftModel } = require("../models/draftModel");

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

const post_connect_two_bus_stop = async (req, res, next) => {
  try {
    let body = req.body;
    let from = body.from;
    let to = body.to;

    // Validation
    let from_bus_stop = await BusStop.findOne(from);
    let to_bus_stop = await BusStop.findOne(to);

    if (!from_bus_stop || !to_bus_stop) {
      return res.status(404).json("Bus stop not found");
    }

    // Step 1 : Scan the Trip bus stop time model with From bus stop Id and get the Array → Called from_bus_stop_time_list

    let from_bus_stop_time_list = await TripBusStopTime.find({
      bus_stop: from_bus_stop._id,
    });
    // .populate({
    //   path: "trip",
    //   model: "Trip",
    //   populate: {
    //     path: "route_number",
    //     model: "route",
    //   },
    // });

    // Step 2 : Scan the Trip bus stop time model with To bus stop Id and Get the array → Called to_bus_stop_time_list

    let to_bus_stop_time_list = await TripBusStopTime.find({
      bus_stop: to_bus_stop._id,
    });
    // .populate({
    //   path: "trip",
    //   model: "Trip",
    //   populate: {
    //     path: "route_number",
    //     model: "route",
    //   },
    // });

    // Step 3 : Check both array are not empty

    if (from_bus_stop_time_list?.length === 0) {
      return res
        .status(400)
        .json("No trip is assigned to this bus stop " + from_bus_stop._id);
    }

    if (to_bus_stop_time_list?.length === 0) {
      return res
        .status(400)
        .json("No trip is assigned to this bus stop " + to_bus_stop._id);
    }

    // return res.status(200).json({
    //   to_bus_stop_time_list,
    //   from_bus_stop_time_list,
    // });

    // Step 4 : Pick a array element where a trip id are same. If no trip are same, then a single route can’t get these two bus stops
    let sameTripId = [];
    let sameTrip_objs = [];

    let from_obj = {};
    for (let i = 0; i < from_bus_stop_time_list?.length; i++) {
      if (from_obj[from_bus_stop_time_list[i].trip]) {
      } else {
        from_obj[from_bus_stop_time_list[i].trip] = from_bus_stop_time_list[i];
      }
    }

    let to_obj = {};
    for (let i = 0; i < to_bus_stop_time_list?.length; i++) {
      if (from_obj[to_bus_stop_time_list[i].trip]) {
        to_obj[to_bus_stop_time_list[i].trip] = 1;
        sameTripId.push(to_bus_stop_time_list[i].trip);
        sameTrip_objs.push({
          to_bus_stop_time: to_bus_stop_time_list[i],
          from_bus_stop_time: from_obj[to_bus_stop_time_list[i].trip],
        });
      }
    }

    if (sameTrip_objs.length === 0) {
      return res.status(400).json("No Single Route reach you there");
    }

    // return res.json({
    //   from_obj,
    //   to_obj,
    //   sameTripId,
    //   sameTrip_objs,
    // });
    // Step 5 : Pick a array element where from_bus_stop_time_list[i].time is lesser than of to_bus_stop_time_list[i].time → Picking a trip bus stop timing where bus travel from ( from bus stop ) to ( to bus stop)
    let possible_Trips = [];

    for (let i = 0; i < sameTrip_objs?.length; i++) {
      if (
        sameTrip_objs[i].to_bus_stop_time.time >
        sameTrip_objs[i].from_bus_stop_time.time
      ) {
        possible_Trips.push(sameTrip_objs[i].to_bus_stop_time.trip);
      }
    }

    let possible_trip_list = await Trip.find({
      _id: { $in: possible_Trips },
    })
      .populate([
        { path: "route_number", model: "route" },
        {
          path: "trip_bus_stop_time_list",
          model: "TripBusStopTime",
          populate: {
            path: "bus_stop",
            model: "BusStop",
            select: "-list -bus_stop_search_list",
          },
        },
      ])
      .lean();

    return res.status(200).json({
      possible_Trips,
      possible_trip_list,
    });

    // Step 6  : Fetch a trip details and route details and organize it and return to API response
    // let organize_bus_stop_trip = [];

    // for (let i = 0; i < possible_trip_list.length; i++) {}
  } catch (e) {
    return res.status(400).json(e);
  }
};

// User API
const get_bus_stop_list = async (req, res, next) => {
  try {
    // ------------------------------
    let date1 = new Date();
    let draft_of_bus_stop_list = await DraftModel.findById(
      "675683d45d6a61c356dc893b"
    );

    let different = (date1 - new Date(draft_of_bus_stop_list.expire)) / 1000;
    if (different < 10) {
      console.log("Fetch Draft");
      let date2 = new Date();
      return res.status(200).json({
        busStopList: JSON.parse(draft_of_bus_stop_list.data),
        responseTime: date2 - date1,
        fetch: "Fetch Draft",
      });
    } else {
      console.log("Fetch Fresh");
      let busStopList = await BusStop.find()
        .select("_id bus_stop_display_name bus_stop_name bus_stop_search_list")
        .populate([
          {
            path: "bus_stop_search_list",
            model: "BusStopSearch",
            select: "text -_id ",
          },
        ]);

      let date2 = new Date();
      draft_of_bus_stop_list.expire = new Date();
      await draft_of_bus_stop_list.save();
      return res.status(200).json({
        busStopList,
        responseTime: date2 - date1,
        fetch: "Fetch Fresh",
      });
    }

    // ------------------------------
  } catch (e) {
    return res.status(400).json(e);
  }
};

module.exports = {
  post_add_bus_stop: post_add_bus_stop,
  post_list,
  post_get_bus_stop_time_and_route: post_get_bus_stop_time_and_route,
  post_connect_two_bus_stop: post_connect_two_bus_stop,

  get_bus_stop_list: get_bus_stop_list,
};
