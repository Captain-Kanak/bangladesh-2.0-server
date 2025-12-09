import express, { Application, json } from "express";
import initializeDatabase from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";

// create express app
const app: Application = express();

// middleware to parse json
app.use(json());

// initialize database
initializeDatabase();

// health check route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Bangladesh 2.0 Server is Running",
  });
});

// api v1 route
app.get("/api/v1", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Bangladesh 2.0 Server API is Working",
  });
});

// app.use("/api/v1/auth", authRoutes);

export default app;
