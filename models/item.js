const mongoose = require("mongoose");

const { Schema } = mongoose;

const itemSchema = new Schema({
  item_name: { type: String, required: true, unique: true },
  quantity: { type: Number, default: 0, required: true },
  date: { type: Date, default: new Date() },
});

module.exports = mongoose.model("item", itemSchema);
