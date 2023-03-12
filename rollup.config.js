import clear from "rollup-plugin-clear";
import screeps from "rollup-plugin-screeps";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { config as readEnv } from "dotenv";
import parseArgs from "minimist";

const args = parseArgs(process.env.argv.split(" "));

if (!args.token) {
  readEnv();
}

console.log(process.env.token);
/** @type {import("rollup-plugin-screeps/dist/rollup-plugin-screeps").ScreepsConfig} */
const config = {
  token: args.token ?? process.env.token,
  branch: args.branch ?? args._[0],
  protocol: args.protocol ?? "https",
  hostname: args.hostname ?? "screeps.com",
  port: args.port ?? 443,
  path: args.path ?? "/",
  email: args.email,
  password: args.password,
};

/** @type {import("rollup").RollupOptions} */
export default {
  input: "./index.js",
  output: {
    file: "dist/main.js",
    format: "cjs",
    sourcemap: true,
  },
  plugins: [
    clear({ target: ["dist"] }),
    resolve(),
    commonjs(),
    screeps({ config, dryRun: false }),
  ],
};
