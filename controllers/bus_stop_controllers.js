const { BusStop } = require("../models/busStopModel");

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

const put_edit_bus_stop = async (req, res, next) => {};

module.exports = {
  post_add_bus_stop: post_add_bus_stop,
  post_list,
};
