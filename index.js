require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const router = require("./routes/route");
const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specific methods
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running on port :", process.env.APP_PORT);
});
