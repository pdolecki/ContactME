const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const contactsRoutes = require("./routes/contacts");
const userRoutes = require("./routes/user");

const app = express();

mongoose.set("strictQuery", false);
mongoose
  .connect(
    `mongodb+srv://root:${process.env.MONGO_ATLAS_PSW}@contactme.qbzhapt.mongodb.net/test`
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection to database failed!");
  });
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  next();
});

app.use("/api/contacts", contactsRoutes);
app.use("/api", userRoutes);

module.exports = app;
