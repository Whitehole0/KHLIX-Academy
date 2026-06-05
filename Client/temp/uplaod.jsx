import React, { useState } from "react";
import axios from axios

const uplaod = ({ courseId, lessonId, token, type }) => {
  const [file, setFile] = useState(null);
  const [uplaoding, setUploding] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleUpload = async () => {
    if (!file) return alert("select a file first");
    setUploding(true);

    try {
      const sigRes = await axios.post(
        "/api/uplaod/signature",
        {
          folder: `courses/${type}`,
          resourse_type: type === " video" ? "video" : "raw",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const sigData = sigRes.sigData;

      const formData = new formData();
      formData.append("file", file);
      formData.append("api_key", sigData.apiKey);

      const cloudRes = await axios.post(``, formData);

      const uploadedFile = cloudRes.sigData;

      await axios.post("/api/course/${courseId}/lesson/${lessonId}/media", {
        type,
        url: uploadedFile.secure_url,
        public_id: uploadedFile.public_id,
      });
    } catch (error) {
      console.log(error);
      alert("uplaod failed");
    } finally {
      setUploding(false);
    }
  };
  return (
    <div>
        <input type="file"  onChange={handleFileChange} accept={type === "video" ?"video/*": type ==="pdf" ? "pdf" : "image/*" }/>
        <button onClick={handleUpload} disabled = {uplaoding}>
            {uplaoding ? "uploading...": `upload ${type}`}
        </button>
    </div>
  );
};

export default uplaod;
