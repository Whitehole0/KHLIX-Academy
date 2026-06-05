import cloudinary from "../config/cloudinary.js";

// export const uploadFile = async (req, res) => {
//   try {
//     if (!req.file) {
//     }
//     const result = await cloudinary.uploader.upload(req.file.path, {});

//     res.json({
//       url: result.secure_url,
//       puplic_id: result.public_id,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const generateUploadSignature = async (req, res) => {
  try {
    if (req.user.role != admin) {
      res.status(403).json({ message: " unAuthorized " });
    }
    const { folder, resorse_type } = req.body;
    const timestamp = Math.round(Date.now() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder,
        resorse_type,
      },
      process.env.CLOUDINARY_SECRET,
    );

    res.status(200).json({
      timestamp,
      signature,
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API,
      folder,
      resorse_type,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const formdata = new FormData();
