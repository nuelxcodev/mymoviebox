const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const net = require("net");

// Path to the .env file
const envPath = path.resolve(__dirname, ".env");

// Environment variables to update
const envUpdates = {
  VITE_API_URL: "http://localhost:5000/api/v1",
  VITE_API_PIC_URL: "http://image.tmdb.org/t/p/w500/",
  CLIENT_HOST: "0.0.0.0",
  CLIENT_PORT: "8081", // Changed client port to 8081
  CLIENT_URL: "http://localhost:5173",
  SERVER_HOST: "0.0.0.0",
  SERVER_PORT: "5000", // Changed server port to 5000
};

// Function to update or append environment variables in the .env file
function updateEnvFile(filePath, updates) {
  let envContent = "";
  if (fs.existsSync(filePath)) {
    envContent = fs.readFileSync(filePath, "utf-8");
  }

  for (const [key, value] of Object.entries(updates)) {
    const regex = new RegExp(`^${key}=.*`, "m");
    if (envContent.match(regex)) {
      // Update existing key
      envContent = envContent.replace(regex, `${key}=${value}`);
    } else {
      // Append new key
      envContent += `\n${key}=${value}`;
    }
  }

  fs.writeFileSync(filePath, envContent.trim());
  console.log(".env file updated successfully.");
}

// Function to check if a port is in use
function checkPortInUse(port, callback) {
  const server = net.createServer();
  server.once("error", (err) => {
    if (err.code === "EADDRINUSE") {
      callback(true); // Port is in use
    } else {
      callback(false);
    }
  });
  server.once("listening", () => {
    server.close();
    callback(false); // Port is free
  });
  server.listen(port);
}

// Check if the client port is free
checkPortInUse(envUpdates.CLIENT_PORT, (clientPortInUse) => {
  if (clientPortInUse) {
    console.error(`Port ${envUpdates.CLIENT_PORT} is already in use for the client.`);
    process.exit(1);
  } else {
    console.log(`Port ${envUpdates.CLIENT_PORT} is free for the client.`);
  }
  
  // Check if the server port is free
  checkPortInUse(envUpdates.SERVER_PORT, (serverPortInUse) => {
    if (serverPortInUse) {
      console.error(`Port ${envUpdates.SERVER_PORT} is already in use for the server.`);
      process.exit(1);
    } else {
      console.log(`Port ${envUpdates.SERVER_PORT} is free for the server.`);
      
      // Update the .env file
      updateEnvFile(envPath, envUpdates);

      // Run Client on CLIENT_HOST and CLIENT_PORT
      const client = exec("npm run dev", {
        cwd: "./nufy-client",
        env: {
          ...process.env,
          HOST: envUpdates.CLIENT_HOST,
          PORT: envUpdates.CLIENT_PORT,
        },
      });
      client.stdout.pipe(process.stdout);
      client.stderr.pipe(process.stderr);

      // Run Server on SERVER_HOST and SERVER_PORT
      const server = exec("npm run dev", {
        cwd: "./nufy_server",
        env: {
          ...process.env,
          HOST: envUpdates.SERVER_HOST,
          PORT: envUpdates.SERVER_PORT,
        },
      });
      server.stdout.pipe(process.stdout);
      server.stderr.pipe(process.stderr);

      // Build Client Application
      const clientBuild = exec("npm run build", { cwd: "./nufy-client" });
      clientBuild.stdout.on("data", (data) => process.stdout.write(`[Client Build]: ${data}`));
      clientBuild.stderr.on("data", (data) => process.stderr.write(`[Client Build Error]: ${data}`));

      // Build Server Application
      const serverBuild = exec("npm run build", { cwd: "./nufy_server" });
      serverBuild.stdout.on("data", (data) => process.stdout.write(`[Server Build]: ${data}`));
      serverBuild.stderr.on("data", (data) => process.stderr.write(`[Server Build Error]: ${data}`));
    }
  });
});
