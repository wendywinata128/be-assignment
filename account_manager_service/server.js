import 'dotenv/config';
import dotenv from 'dotenv';
import express, { json, urlencoded } from "express";
import IndexRouter from './src/routes/index_routes.js';
import { ResponseError } from "./src/entity/response-error.js";
import cors from 'cors';

dotenv.config();

const port = process.env.PORT ?? "8000";
const app = express();

app.use(json(), urlencoded({ extended: true }), cors());

app.listen(port, () => {
  console.log(`Account manager services running successfully in port ${port}`);
});

app.use(IndexRouter);

app.use((err, req, res, next) => {
  if (err instanceof ResponseError) {
    return res.status(err.status).json({
      message: err.message,
      data: null,
      errors: err.errors,
    });
  }

  console.error(err);
  res.status(500).json({
    message: "Internal Server Error",
    data: null,
  });
});