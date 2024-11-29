const mongoose = require("mongoose");

let route = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  route_number: { type: String, required: true },
  from_to: [{ type: mongoose.Schema.Types.ObjectId }],
  to_from: [{ type: mongoose.Schema.Types.ObjectId }],
});

const Route = mongoose.model("route", route);

module.exports = {
  Route: Route,
};
