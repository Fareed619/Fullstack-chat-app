import { v2 as cloudinary } from "cloudinary";
import { configDotenv } from "dotenv";

configDotenv();


// once you upload images  we will be able to get the url of the image and see them in th cloudinary dashboard
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
