const express = require("express");
const router = require("./routes/route");
const app = express();
const cors = require("cors");
const path = require("path"); // Import `path` at the
// const { databaseconnection } = require("./utils/helpers");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") }); // Use `path` correctly

// Environment Variables
const PORT = process.env.PORT || 8000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: ["POST", "GET", "PUT", "DELETE"], // Allow additional HTTP methods if necessary
  })
);

// Logger Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use("/api/v1", router);

app.get("/api/v1", (req, res) => {
  res.send("API is working!");
});

// Serve Static Files for Frontend
const frontendPath = path.join(__dirname, "../nufy-client/dist");
app.use(express.static(frontendPath));

// Fallback Route for SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Database Connection and Server Start
// databaseconnection(); // Ensure database connection is successful
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Client is accessible at ${CLIENT_URL}`);
});
