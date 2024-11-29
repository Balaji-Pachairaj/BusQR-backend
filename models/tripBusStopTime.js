const mongoose = require("mongoose");

const tripBusStopTime = new mongoose.Schema({
  time: { type: Number, required: true },
  bus_stop: { type: mongoose.Schema.Types.ObjectId },
  trip: { type: mongoose.Schema.Types.ObjectId },
});

const TripBusStopTime = mongoose.model("TripBusStopTime", tripBusStopTime);

module.exports = {
  TripBusStopTime: TripBusStopTime,
};
