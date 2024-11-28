const { BusStopSearch } = require("../models/busStopSearchModel");
const { BusStop } = require("../models/busStopModel");

const add_search_for_bus_stop = async (body) => {
  let created_bus_search = [];
  try {
    let bus_stop = await BusStop.findById(body?.bus_stop);
    if (!bus_stop) {
      return { status: 404, json: "Invaild Id for bus stop" };
    }
    for (let i = 0; i < body?.list?.length; i++) {
      let text = body?.list[i];
      let bus_stop_search = await BusStopSearch.create({
        text,
        bus_stop: body?.bus_stop,
      });
      bus_stop.bus_stop_search_list.push(bus_stop_search._id);
      created_bus_search.push(bus_stop_search);
    }
    await bus_stop.save();
  } catch (e) {
    return { status: 404, json: e };
  }
  return { status: 201, json: created_bus_search };
};

const post_create_bus_stop_list = async (req, res, next) => {
  let obj = await add_search_for_bus_stop(req.body);
  return res.status(obj?.status).json(obj?.json);
};

const post_create_bus_stop = async (req, res, next) => {
  try {
    let body = req.body;
    let bus_stop = await BusStop.findById(body?.bus_stop);
    if (bus_stop) {
      let bus_stop_search = await BusStopSearch.create(body);
      bus_stop.bus_stop_search_list.push(bus_stop_search._id);
      await bus_stop.save();
      return res.status(201).json({ bus_stop_search, bus_stop });
    }
    return res.status(400).json("Invalid Id");
  } catch (e) {
    return res.status(400).json(e);
  }
};

const get_bus_search = async (req, res, next) => {
  try {
    let bus_search_list = await BusStopSearch.find({
      text: { $regex: req.query?.text, $options: "i" },
    });

    let obj = {};
    let array = [];
    for (let i = 0; i < bus_search_list?.length; i++) {
      if (obj[bus_search_list[i].bus_stop]) {
      } else {
        obj[bus_search_list[i].bus_stop] = 2;
        array.push(bus_search_list[i]);
      }
    }

    let Bus_Stops_array = [];
    for (let i = 0; i < array?.length; i++) {
      let bus_stop = await BusStop.findById(array[i]?.bus_stop).select(
        "-bus_stop_search_list"
      );
      Bus_Stops_array.push(bus_stop);
    }
    return res
      .status(200)
      .json({ bus_search_list, array, obj, Bus_Stops_array });
  } catch (e) {
    return res.status(400).json(e);
  }
};

module.exports = {
  post_create_bus_stop: post_create_bus_stop,
  post_create_bus_stop_list: post_create_bus_stop_list,
  get_bus_search: get_bus_search,
};
