const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// const busStop = require("./routes/bus_stop");
// const busStopSearch = require("./routes/bus_stop_search");
// const routes = require("./routes/routes");
// const trip = require("./routes/trip_routes");
// const tripBusStopTime = require("./routes/trip_bus_stop_time_route");

const motor_user = require("./routes/motor_user_route");
const motor_unit = require("./routes/motor_unit_route");
const motor_department = require("./routes/motor_department_route");
const motor_motor = require("./routes/motor_motor_route");

const app = express();
const cors = require("cors");

mongoose.connect(
  "mongodb+srv://balajipachairaj:hUNLUJvcqA3mhmeS@cluster0.cgdns.mongodb.net"
);

const corsOptions = {
  origin: "*", // Specify the allowed origin(s)
  methods: "*", // Specify the allowed HTTP methods
  optionsSuccessStatus: 204, // Set the status code for successful preflight requests
};

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("db CONNECTED");
});

app.use(bodyParser.json());
app.use(cors(corsOptions));

// app.use("/api/v1/bus_stop", busStop);
// app.use("/api/v1/bus_stop_search", busStopSearch);
// app.use("/api/v1/route", routes);
// app.use("/api/v1/trip", trip);
// app.use("/api/v1/trip_bus_stop_time", tripBusStopTime);

app.use("/api/user", motor_user);
app.use("/api/unit", motor_unit);
app.use("/api/department", motor_department);
app.use("/api/motor", motor_motor);

app.use((req, res, next) => {
  res.status(404).json("API is not found");
});

// let port = process.env.PORT;
let port = 5000;

app.listen(port, () => {
  console.log("Server has started on port 3000");
});
