import express, { json, urlencoded } from "express";
import "dotenv/config";
import IndexRouter from "./src/routes/index_routes.js";
import { ResponseError } from "./src/entity/response-error.js";
import cors from "cors";
import { initRecurring } from "./src/process/recurring.js";

const app = express();
const port = process.env.PORT ?? 8001;

app.use(json(), urlencoded({ extended: true }), cors());

app.listen(port, () => {
  console.log(`transaction service running on port ${port}`);
  initRecurring();
});

app.use(IndexRouter);

app.use((err,req, res, next) => {
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
