const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/todolist", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    });
    console.log("Connected to db!");
  } catch (error) {
    console.log("DB Connection Failed", error);
  }
};

module.exports = connectDB;
