const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const server = require('http').createServer(app);
const socket = require('./chat/socket')(server);
const PORT = process.env.PORT || 8000

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/users", require("./routes/users"));
app.use("/images", require("./routes/images"));
app.use("/listings", require("./routes/listings"));
app.use("/listing", require("./routes/listing"));
app.use("/chat", require("./routes/chat"));

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

server.listen(PORT, function () {
  console.log("Server listening on port 8000");
});
