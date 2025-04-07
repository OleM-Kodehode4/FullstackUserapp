import express from "express";
import dotenv from "dotenv";
import sql from "mssql";
import userRoutes from "./routes/userRoutes.js";

dotenv.config(); // Initialiser dotenv for å lese miljøvariabler fra .env

const app = express();
app.use(express.json());

// Test database connection
const testDatabaseConnection = async () => {
  try {
    await sql.connect({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      server: process.env.DB_HOST,
      database: process.env.DB_NAME,
      options: {
        encrypt: true, // Hvis du bruker Azure, eller ønsker kryptering
        trustServerCertificate: true, // Bare for utvikling, fjerner sertifikatfeil
      },
    });
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
};

// Kall på test for å verifisere databaseforbindelse
testDatabaseConnection();

// API-ruter
app.use("/api/user", userRoutes);

// Start serveren
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
