const { Schema, Types, model } = require("mongoose");

const TodoSchema = new Schema({
  _id: Schema.Types.String,
  title: Schema.Types.String,
  desc: Schema.Types.String,
});

const Item = model("Item", TodoSchema);

module.exports = Item;
