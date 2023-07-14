const expressLoader = require("./express");
const mongooseLoader = require("./mongoose");

async function init(app) {
  try {
    await mongooseLoader();
    await expressLoader(app);
  } catch (error) {
    console.log(error);
  }
}

module.exports = init;
