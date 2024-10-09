import bodyParser from "body-parser";
import cors from 'cors';
import express, { Request, Response } from "express";
import { CORS_CONFIG } from "./config/server-config";
import { getRoutes } from "./routes";

const app = express();

//Enabling CORS
app.use(cors(CORS_CONFIG));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Elastic indexer");
});

getRoutes(app);

export default app;
