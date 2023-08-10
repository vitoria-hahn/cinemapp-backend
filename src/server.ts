import express from "express";
import dotenv from "dotenv";

import { Router, Request, Response } from "express";

const app = express();

const route = Router();

app.use(express.json());

dotenv.config();

route.get("/", (req: Request, res: Response) => {
  res.json({ message: "hello world with Typescript" });
});

app.use(route);

app.listen(3333, () => "server running on port 3333");
