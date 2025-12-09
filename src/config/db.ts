import { Pool } from "pg";
import envConfig from "./envConfig";

const pool = new Pool({
  connectionString: envConfig.dbString,
});

const initializeDatabase = async () => {
  try {
    await pool.query(
      `
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(150) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          dob DATE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `
    );
  } catch (error: any) {
    console.error("Database initialization failed", error.message);
    process.exit(1);
  }
};

export default initializeDatabase;
