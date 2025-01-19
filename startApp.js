const { exec } = require("child_process");

const envPath = require("path").resolve(__dirname, ".env");
const options = { env: { ...process.env, DOTENV_CONFIG_PATH: envPath } };

const client = exec("npm run dev", { cwd: "./nufy-client", ...options });
client.stdout.pipe(process.stdout);
client.stderr.pipe(process.stderr);

const server = exec("npm run dev", { cwd: "./nufy_server", env: process.en });
server.stdout.pipe(process.stdout);
server.stderr.pipe(process.stderr);


