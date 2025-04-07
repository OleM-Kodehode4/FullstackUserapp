import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./sql.js"; // Importer sql.js (eller db.js)

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDb(); // Kall på funksjonen for å etablere en tilkobling til databasen

// Definer API-endepunktene her

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
