const mongoose = require("mongoose");

const trip = new mongoose.Schema({
  route_number: { type: mongoose.Schema.ObjectId },
  trip_bus_stop_time_list: [{ type: mongoose.Schema.ObjectId }],
});

const Trip = mongoose.model("Trip", trip);

module.exports = {
  Trip: Trip,
};
