const mongoose = require("mongoose");

async function mongooseLoader() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Connected to database...");
  } catch (error) {
    console.log(error);
  }
}

module.exports = mongooseLoader;
