const express = require("express");
const router = require("./routes/route");
const app = express();
const bodypasser = express.json;
const cors = require("cors");
const { databaseconnection } = require("./utils/helpers");

require("dotenv").config({path:'../.env'});

const { PORT } = process.env;
app.use(bodypasser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["POST", "GET"],
  })
);
app.use((req, res, next) => {
  console.log(`${req.method}/${req.url}`);
  next();
});
app.use("/api/v1", router);

app.listen(PORT, 0.0.0.0,() => {
  // databaseconnection()
  console.log(`project is now running on ${PORT}`);
});
