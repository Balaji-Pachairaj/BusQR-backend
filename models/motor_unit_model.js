const mongoose = require("mongoose");

let route = new mongoose.Schema({
  unit_id: { type: String, required: true },
  unit_name: { type: String, required: true },
  unit_address_line_1: { type: String, required: true },
  unit_address_line_2: { type: String, required: true },
  unit_location: { type: String, required: true },
  active_department_count: { type: String, required: true },
  total_department_count: { type: String, required: true },
});

const Motor_Unit = mongoose.model("unit", route);

module.exports = {
  Motor_Unit: Motor_Unit,
};
