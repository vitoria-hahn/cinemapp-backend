import express from "express";
import dotenv from "dotenv";

import { Router, Request, Response } from "express";
import { connectDb } from "./api/database/connection";

import "./api/database/runMigrations";

const app = express();

const route = Router();

app.use(express.json());

dotenv.config();

route.get("/", async (req: Request, res: Response) => {
  res.json({ message: "hello world with Typescript" });
  await connectDb();
});

app.use(route);

app.listen(3333, () => "server running on port 3333");
