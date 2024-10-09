import { Router, Express } from "express";
import route from "./sync";

const getRoutes = (app: Express) => {
    app.use("/", route);
};

export { getRoutes };
