import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST, // Bruk serverens navn som er angitt i .env-filen
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // Bruk dette hvis du har kryptering aktivert på SQL Server
    trustServerCertificate: true, // Sett til true hvis du bruker en selvsignert sertifikat
  },
};

let poolPromise;

const connectDb = async () => {
  try {
    if (!poolPromise) {
      poolPromise = sql.connect(config);
      console.log("Connected to the database");
    }
    return poolPromise;
  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw err;
  }
};

export default connectDb;
