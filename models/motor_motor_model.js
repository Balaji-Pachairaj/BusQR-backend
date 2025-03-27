const mongoose = require("mongoose");

let route = new mongoose.Schema({
  motor_number: { type: String, required: true },
  motor_type: { type: String, required: true },
  motor_department: { type: String, required: true },
  machine_number: { type: String, required: true },
  machine_type: { type: String, required: true },
  unit_id: { type: String, required: true },
  status: { type: String, required: true },
});

const Motor_Motor = mongoose.model("motor", route);

module.exports = {
    Motor_Motor: Motor_Motor,
};
