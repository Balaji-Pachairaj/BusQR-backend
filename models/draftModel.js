const mongoose = require("mongoose");

const draft = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
  expire: {
    type: Date,
    default: null,
  },
});

const DraftModel = mongoose.model("Draft", draft);

module.exports = { DraftModel };
