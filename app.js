const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

///import route
const item = require("./routers/item");

app.use(helmet()); // Sanitization of requests
app.use(express.json()); // Parsing requests as in JSON format
app.use(cors()); //Use CORS

// Connect to database
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("debug", true);
const conn = mongoose.connection;
conn.on("error", console.error.bind(console, "MongoDB Error: "));
conn.on("connected", () => {
  console.log("Connected To Database...");
});

//routes
app.use("/item", item);

// 404
app.use(function (req, res, next) {
  return res.status(404).send({ message: "Route" + req.url + " Not found." });
});

// 500 - Any server error
app.use(function (err, req, res, next) {
  return res.status(500).send({ error: err });
});

// Start Server
app.listen(port, () => console.log("Server running on port", port, "..."));
