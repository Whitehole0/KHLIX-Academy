import cloudinary from "../config/cloudinary.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
    }
    const result = await cloudinary.uploader.upload(req.file.path, {});

    res.json({
      url: result.secure_url,
      puplic_id: result.public_id,
    });
  } catch (error) {
    console.log(error);
  }
};
