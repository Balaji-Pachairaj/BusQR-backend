const mongoose = require("mongoose");

let route = new mongoose.Schema({
  route_number: { type: String, required: true },
  list_of_stops: [
    {
      name: { type: String },
      city: { type: String },
      time: { type: Number }, // Time is mentioned by the number of mintues past after 12 : 00 AM
    },
  ],
});

const Route = mongoose.model("route", route);

module.exports = {
  Route: Route,
};
