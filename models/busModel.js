const mongoose = require("mongoose");

const bus = new mongoose.Schema({
  bus_route: { types: String, required: true },
  final_detiny_location: {
    name: { types: String, required: true },
    location: { types: String, required: true },
  },
  bus_arrival_book_time: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Bus = mongoose.model("Bus", bus);

module.exports = {
  Bus: Bus,
};
