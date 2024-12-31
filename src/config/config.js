import { config as conf } from "dotenv";
conf();

const _config = {
  port: process.env.SERVER_PORT,
  databaseUrl: process.env.MONGODB_URL,
  env: process.env.NODE_ENV,
  frontedUrl: process.env.FRONTEND_URL,
  
  cloudinaryCloud: process.env.CLOUDINARY_CLOUD,
  cloudApiKey: process.env.CLOUDINARY_API_KEY,
  cloudnaryApiScrete: process.env.CLOUDINARY_API_SECRET,
};

const config = Object.freeze(_config);

export default config;