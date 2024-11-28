const mongoose = require("mongoose");

const busStopSearch = new mongoose.Schema({
    text: { type: String, required: true },
    bus_stop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BusStop",
        required: true,
    },
});

busStopSearch.index({ text: 1 });

const BusStopSearch = mongoose.model("BusStopSearch", busStopSearch);

module.exports = {
  BusStopSearch: BusStopSearch,
};
