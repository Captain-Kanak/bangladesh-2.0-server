import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const envConfig = {
  port: process.env.PORT,
};

export default envConfig;
