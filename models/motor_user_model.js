const mongoose = require("mongoose");

let route = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, required: true },
  unit_or_departement_name: { type: String, required: true },
  password: { type: String, required: true },
});

const Motor_User = mongoose.model("motor_user", route);

module.exports = {
  Motor_User: Motor_User,
};
