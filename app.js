// Load environment variable into "process.env":
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
console.log("Environment variables loaded...");

const express = require("express");
const loader = require("./loaders/index");

let app;

async function startServer() {
  app = express();

  try {
    await loader(app);
  } catch (error) {
    console.log(error);
  }
}
startServer();
