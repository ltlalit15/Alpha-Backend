import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import { dbConnect } from "./Config/dbConnect.js";
import routes from "./app.js";
import cluster from "cluster";
import os from "os";

dotenv.config();

const PORT = 3000;
const numCPUs = os.cpus().length;

if (cluster.isPrimary) {

  // Fork workers for each CPU
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Restart worker if it crashes
  cluster.on("exit", (worker, code, signal) => {
    cluster.fork();
  });
} else {
  // Worker processes
  const app = express();

  dbConnect();

  app.use(cors({origin: "*"}));
  
  app.use(morgan("tiny"));
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  app.use(cookieParser());

  app.use(routes);

  app.listen(PORT, () => {
    console.log(`✅ Worker ${process.pid} running on port ${PORT}`);
  });
}
