const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const net = require("net");

// Path to the .env file
const envPath = path.resolve(__dirname, ".env");

// Environment variables to update (without client and server URLs)
const envUpdates = {
  CLIENT_HOST: "0.0.0.0",
  CLIENT_PORT: "8081", // Starting port for client
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

// Automatically find a free port starting from the provided port number
function findFreePort(startPort, callback) {
  let port = startPort;
  checkPortInUse(port, (inUse) => {
    if (inUse) {
      console.log(`Port ${port} is already in use, trying the next one.`);
      findFreePort(port + 1, callback); // Try the next port
    } else {
      callback(port); // Port is free
    }
  });
}

// Find a free port for the client
findFreePort(parseInt(envUpdates.CLIENT_PORT), (clientFreePort) => {
  envUpdates.CLIENT_PORT = clientFreePort;

  console.log(`Port ${envUpdates.CLIENT_PORT} is free for the client.`);

  // Check if the server port is free
  checkPortInUse(envUpdates.SERVER_PORT, (serverPortInUse) => {
    if (serverPortInUse) {
      console.error(
        `Port ${envUpdates.SERVER_PORT} is already in use for the server.`
      );
      process.exit(1);
    } else {
      console.log(`Port ${envUpdates.SERVER_PORT} is free for the server.`);

      // Start Client and Server and update URLs after they start
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

      // Wait for both client and server to start and update URLs in .env file
      setTimeout(() => {
        const clientURL = `http://${envUpdates.CLIENT_HOST}:${envUpdates.CLIENT_PORT}`;
        const serverURL = `http://${envUpdates.SERVER_HOST}:${envUpdates.SERVER_PORT}`;

        // Update URLs in .env
        const updatedEnv = {
          ...envUpdates,
          CLIENT_URL: clientURL, // Client URL
          VITE_API_URL: serverURL, // Server API URL
        };

        updateEnvFile(envPath, updatedEnv);

        // Build Client Application
        const clientBuild = exec("npm run build", { cwd: "./nufy-client" });
        clientBuild.stdout.on("data", (data) =>
          process.stdout.write(`[Client Build]: ${data}`)
        );
        clientBuild.stderr.on("data", (data) =>
          process.stderr.write(`[Client Build Error]: ${data}`)
        );

        // Build Server Application
        const serverBuild = exec("npm run build", { cwd: "./nufy_server" });
        serverBuild.stdout.on("data", (data) =>
          process.stdout.write(`[Server Build]: ${data}`)
        );
        serverBuild.stderr.on("data", (data) =>
          process.stderr.write(`[Server Build Error]: ${data}`)
        );
      }, 5000); // Wait for 5 seconds for both client and server to start
    }
  });
});
