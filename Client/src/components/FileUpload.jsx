// src/components/FileUpload.jsx
import { useState, useRef } from "react";

const FileUpload = ({
  onUpload,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB default
  multiple = false,
  label = "Upload File",
}) => {
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const validateFiles = (fileList) => {
    const validFiles = [];
    const errors = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];

      // Check file type
      if (!file.type.match(accept.replace("*", ".*"))) {
        errors.push(`${file.name}: Invalid file type`);
        continue;
      }

      // Check file size
      if (file.size > maxSize) {
        errors.push(
          `${file.name}: File too large (max ${maxSize / (1024 * 1024)}MB)`,
        );
        continue;
      }

      validFiles.push(file);
    }

    return { validFiles, errors };
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const droppedFiles = e.dataTransfer.files;
    const { validFiles, errors } = validateFiles(droppedFiles);

    if (errors.length > 0) {
      setError(errors.join(", "));
      setTimeout(() => setError(""), 5000);
    }

    if (validFiles.length > 0) {
      if (!multiple) {
        setFiles([validFiles[0]]);
        onUpload?.(validFiles[0]);
      } else {
        setFiles((prev) => [...prev, ...validFiles]);
        onUpload?.(validFiles);
      }
    }
  };

  const handleFileSelect = (e) => {
    const selectedFiles = e.target.files;
    const { validFiles, errors } = validateFiles(selectedFiles);

    if (errors.length > 0) {
      setError(errors.join(", "));
      setTimeout(() => setError(""), 5000);
    }

    if (validFiles.length > 0) {
      if (!multiple) {
        setFiles([validFiles[0]]);
        onUpload?.(validFiles[0]);
      } else {
        setFiles((prev) => [...prev, ...validFiles]);
        onUpload?.(validFiles);
      }
    }
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragging ?
            "border-indigo-500 bg-indigo-900/10"
          : "border-gray-700 hover:border-gray-600"
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="text-4xl mb-4 text-gray-400">📁</div>
        <p className="text-white font-medium mb-2">{label}</p>
        <p className="text-sm text-gray-400">
          Drag and drop or click to select
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Max file size: {maxSize / (1024 * 1024)}MB
        </p>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-900/20 border border-red-700 rounded-lg">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center mr-3">
                  {file.type.startsWith("image/") ? "🖼️" : "📄"}
                </div>
                <div>
                  <div className="text-white text-sm font-medium">
                    {file.name}
                  </div>
                  <div className="text-xs text-gray-400">
                    {(file.size / 1024).toFixed(2)} KB
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="text-gray-400 hover:text-red-400"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
