import express from "express";
import dotenv from "dotenv";
import ConnectDb from "./config/db.js";
import cors from "cors";
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
app.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
});

// =============================== Routes ================================

import userRoutes from "./routes/userRoutes.js";

app.use("/api", userRoutes);

// ================================ Routes End ============================

ConnectDb(process.env.MONGO_URL);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
