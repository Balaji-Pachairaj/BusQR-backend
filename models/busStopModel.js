const mongoose = await require("mongoose");

const busStop = new mongoose.Schema({
  bus_stop_name: { types: String, required: true },
  bus_stop_location: { type: String, required: true },

  bus_list: [{ type: mongoose.Schema.Types.ObjectId }],
});

const BusStop = mongoose.model("BusStop", busStop);

module.exports = {
  BusStop: BusStop,
};
