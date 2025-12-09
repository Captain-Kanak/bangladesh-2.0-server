import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const envConfig = {
  dbString: process.env.DB_STRING,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
};

export default envConfig;
