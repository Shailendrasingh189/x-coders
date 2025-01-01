// import multer from "multer";
// import path from "path";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import { cloudinary } from "../config/cloudinary.js";

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//       allowed_formats: ["jpg", "jpeg", "png"],
//       dest: path.resolve(__dirname, "../../public/data/uploads"),
//       limits: { fileSize: 10 * 1024 * 1024 },
//   },
//    storage.fields([
//     { name: "uploadPhoto", maxCount: 1 },
//   ]),
// });

 
//  upload = multer({ storage });

// export default upload;


import multer from "multer";
import path from "path";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    allowed_formats: ["jpg", "jpeg", "png"],
    folder: "user_profiles", // Optionally, specify a folder on Cloudinary
    transformation: [{ width: 500, height: 500, crop: "limit" }], // Optional image transformations
    limits: { fileSize: 10 * 1024 * 1024 }, // Max file size: 10MB
  },
});

const upload = multer({ storage });

export default upload;
