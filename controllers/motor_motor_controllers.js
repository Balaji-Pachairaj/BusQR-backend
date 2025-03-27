const { Motor_Motor } = require("../models/motor_motor_model");

const post_add_unit = async (req, res, next) => {
  try {
    let body = req.body;
    let response = await Motor_Motor.create(body);
    console.log(response);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json(e);
  }
};

const edit_unit = async (req, res, next) => {
  try {
    // Get the user ID from the request parameters
    let body = req.body; // Get the updated data from the request body

    let response = await Motor_Motor.findByIdAndUpdate(body._id, body, {
      new: true,
    });

    if (!response) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(response);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json(e);
  }
};

const authenticate_unit = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    // Find user by email
    let user = await Motor_Motor.findOne({ email });

    if (!user || user.password !== password) {
      return res
        .status(401)
        .json({ auth: "no", message: "Invalid credentials" });
    }

    return res
      .status(200)
      .json({ auth: "yes", message: "Authentication successful" });
  } catch (e) {
    return res
      .status(500)
      .json({ auth: "no", message: "Internal server error", error: e });
  }
};

const get_all_unit = async (req, res, next) => {
  try {
    let body = req.body;
    let users = await Motor_Motor.find({ status: body.status }, "-password"); // Exclude password field for security
    return res.status(200).json(users);
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};

module.exports = {
  post_add_unit,
  edit_unit,
  authenticate_unit,
  get_all_unit,
};
