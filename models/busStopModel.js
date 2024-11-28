const mongoose = require("mongoose");

const busStop = new mongoose.Schema({
  bus_stop_id: { type: String, unique: true, required: true },
  bus_stop_name: { type: String, required: true },
  bus_stop_display_name: { type: String, required: true },
  bus_stop_location_link: { type: String },
  list: [{ type: mongoose.Schema.Types.ObjectId }],
  bus_stop_search_list: [
    { type: mongoose.Schema.Types.ObjectId, ref: "BusStopSearch" },
  ],
});

const BusStop = mongoose.model("BusStop", busStop);

module.exports = {
  BusStop: BusStop,
};
