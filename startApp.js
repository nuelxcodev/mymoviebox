const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

// Function to ensure the frontend is built
function ensureFrontendBuild() {
  const distPath = path.resolve(__dirname, "./nufy-client/dist");

  if (!fs.existsSync(distPath)) {
    console.log("Frontend build not found. Building the frontend...");
    const build = exec("npm run build", { cwd: "./nufy-client" });

    build.stdout.pipe(process.stdout);
    build.stderr.pipe(process.stderr);

    return new Promise((resolve, reject) => {
      build.on("exit", (code) => {
        if (code === 0) {
          console.log("Frontend build completed successfully.");
          resolve();
        } else {
          console.error("Frontend build failed.");
          reject(new Error("Frontend build failed"));
        }
      });
    });
  } else {
    console.log("Frontend build exists. Skipping build step.");
    return Promise.resolve();
  }
}

// Main function to start the client and server
async function startProcesses() {
  try {
    const envPath = path.resolve(__dirname, ".env");
    const options = { env: { ...process.env, DOTENV_CONFIG_PATH: envPath } };

    // Ensure the frontend is built before starting processes
    await ensureFrontendBuild();

    console.log("Starting the client...");
    const client = exec("npm run dev", { cwd: "./nufy-client", ...options });
    client.stdout.pipe(process.stdout);
    client.stderr.pipe(process.stderr);

    console.log("Starting the server...");
    const server = exec("npm run dev", { cwd: "./nufy_server", ...options });
    server.stdout.pipe(process.stdout);
    server.stderr.pipe(process.stderr);

    client.on("exit", (code) => {
      console.log(`Client process exited with code ${code}`);
    });

    server.on("exit", (code) => {
      console.log(`Server process exited with code ${code}`);
    });
  } catch (error) {
    console.error("Error starting processes:", error.message);
    process.exit(1);
  }
}

// Run the start processes function
startProcesses();
