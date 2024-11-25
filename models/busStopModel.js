const mongoose = require("mongoose");

const busStop = new mongoose.Schema({
  bus_stop_id: { type: String, unique: true, required: true },
  bus_stop_name: { type: String, required: true },
  bus_stop_city_name: { type: String, required: true },
  bus_stop_location_link: { type: String },
  bus_list: [],
});

const BusStop = mongoose.model("BusStop", busStop);

module.exports = {
  BusStop: BusStop,
};
