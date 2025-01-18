const express = require("express");
const router = require("./routes/route");
const app = express();
const bodypasser = express.json;
const cors = require("cors");
const { databaseconnection } = require("./utils/helpers");

require("dotenv").config({path:'../.env'});

const PORT  = process.env.PORT || 8000;
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

app.get("/api/v1", (req, res) => {
  res.send("API is working");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
