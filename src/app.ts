import express, { Application, json } from "express";

const app: Application = express();

app.use(json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Bangladesh 2.0 Server is Running",
  });
});

export default app;
