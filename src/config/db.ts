import { Pool } from "pg";
import envConfig from "./envConfig";

export const pool = new Pool({
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
          role VARCHAR(50) DEFAULT 'user',
          phone VARCHAR(20),
          date_of_birth DATE,
          last_login TIMESTAMPTZ DEFAULT NOW(),
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        )
      `
    );
  } catch (error: any) {
    console.error("Database initialization failed", error.message);
    process.exit(1);
  }
};

export default initializeDatabase;
