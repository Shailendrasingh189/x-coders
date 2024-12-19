import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/config/ConnectDB.js";

const startServer = async () => {
  await connectDB();
  const port = config.port || 4000;
  app.listen(port, () => {
    console.log(`Server is Running on port: ${port}`);
  });
    
    process.on("unhandledRejections", (err, promise) => {
      console.log(`Logged Error: ${err}`);
      server.close(() => process.exit(1));
    });
};

startServer();
