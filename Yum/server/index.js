const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/users", require("./routes/users"));
app.use("/images", require("./routes/images"));
app.use("/listings", require("./routes/listings"));
app.use("/listing", require("./routes/listing"));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established");
});

app.listen(8000, function () {
  console.log("Server listening on port 8000");
});
