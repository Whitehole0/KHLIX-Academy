import PDFDocument from "pdfkit";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

export const genertateCertificate = (userName, courseId) => {
  return new Promise((resolve, reject) => {
    const cirtficateId = uuidv4();
    const filePath = path.join("certficate", `${cerficateId}`);

    const doc = new PDFDocument({
      size: "A4",
      layout: "landscape",
    });

    doc.pipe(fs.createWriteStream(filePath));
    doc.fontSize(35).text("Certficate of Completion");
  });
};
