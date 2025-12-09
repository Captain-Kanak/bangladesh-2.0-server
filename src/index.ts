import app from "./app";
import envConfig from "./config/envConfig";

const port = envConfig.port;

app.listen(port, () => {
  console.log(`Bangladesh 2.0 Server Running on port: ${port}`);
});
