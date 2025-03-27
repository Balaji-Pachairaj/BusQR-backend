const mongoose = require("mongoose");

let route = new mongoose.Schema({
  department_id: { type: String, required: true },
  department_name: { type: String, required: true },
  admin_count: { type: String, required: true },
  employee_count: { type: String, required: true },
  machine_count: { type: String, required: true },
  motor_count: { type: String, required: true },
  unit_id: { type: String, required: true },
  unit_name: { type: String, required: true },
});

const Motor_Department = mongoose.model("department", route);

module.exports = {
  Motor_Department: Motor_Department,
};
