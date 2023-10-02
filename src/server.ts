require("dotenv").config();

import express, { Application, Request, Response, NextFunction } from "express";

const app: Application = express();
const db_connect = require("./config/database");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

const userRoute = require("./route/user");

db_connect();

app.use(express.json());

app.use("/user", userRoute);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res
    .status(err.status || 500)
    .send(err.message || "An unexpected error occured");
});

mongoose.connection.once("open", () => {
  app.listen(PORT, (): void => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
