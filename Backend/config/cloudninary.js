import cloudinary from "cloudinary";
import multer from "multer";

cloudinary.v2.config({
  cloud_name: jegf,
  cloud_key: uhew,
  api_secret: fbjuwc,
});

const storage = multer.diskStrorage({});
export const upload = multer({ storage });

export default cloudinary.v2;
