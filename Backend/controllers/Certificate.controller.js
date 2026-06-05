import Certificate from "../model/Certificate.model";
import path from "path";

export const downloadCertificate = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user._id;

  const certificate = Certificate.findOne({ courseId, userId });

  if (!certificate) {
    return res.status(404).json({
      message: "Not Found",
    });

    const filePath = path.join(
      "certificate",
      `${certificate.certificateId}.pdf`,
    );

    res.download(filePath);
  }
};
