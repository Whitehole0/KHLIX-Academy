// src/pages/admin/UploadLesson.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { uploadAPI, lessonsAPI } from "../../utils/api";

const UploadLesson = () => {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const [videoData, setVideoData] = useState({
    videoFile: null,
    videoUrl: "",
    uploadId: "",
  });

  const [lessonData, setLessonData] = useState({
    title: "",
    description: "",
    content: "",
    duration: 0,
    order: 0,
  });

  const editLessonId = searchParams.get("edit");

  useEffect(() => {
    if (editLessonId) {
      fetchLessonData();
    }
  }, [editLessonId]);

  const fetchLessonData = async () => {
    try {
      // Note: This would need a specific lesson endpoint
      // For now, we'll set up the form for editing
      setLessonData({
        title: "Existing Lesson",
        description: "Lesson description",
        content: "Lesson content",
        duration: 600,
        order: 1,
      });
      setStep(2); // Skip to step 2 for editing
    } catch (err) {
      setError("Failed to load lesson data");
    }
  };

  const handleVideoUpload = async () => {
    if (!videoData.videoFile) {
      setError("Please select a video file");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("video", videoData.videoFile);

    try {
      const response = await uploadAPI.uploadVideo(formData);
      setVideoData((prev) => ({
        ...prev,
        videoUrl: response.data.url,
        uploadId: response.data.id,
      }));
      setStep(2);
    } catch (err) {
      setError("Failed to upload video");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleCreateLesson = async () => {
    if (!lessonData.title.trim()) {
      setError("Lesson title is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const lessonPayload = {
        ...lessonData,
        courseId,
        videoUrl: videoData.videoUrl,
        uploadId: videoData.uploadId,
      };

      if (editLessonId) {
        // Update existing lesson (endpoint would need to be added)
        await new Promise((resolve) => setTimeout(resolve, 500));
      } else {
        await lessonsAPI.createLesson(lessonPayload);
      }

      navigate(`/admin/course/${courseId}`);
    } catch (err) {
      setError("Failed to save lesson");
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("video/")) {
        setError("Please select a video file");
        return;
      }
      if (file.size > 500 * 1024 * 1024) {
        // 500MB limit
        setError("File size must be less than 500MB");
        return;
      }
      setVideoData((prev) => ({ ...prev, videoFile: file }));
      setError("");
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to={`/admin/course/${courseId}`}
            className="text-indigo-400 hover:text-indigo-300 mb-4 inline-block"
          >
            ← Back to Course
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">
            {editLessonId ? "Edit Lesson" : "Upload New Lesson"}
          </h1>
          <p className="text-gray-400">Step {step} of 2</p>
        </div>

        <div className="card">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-400"}`}
              >
                1
              </div>
              <div
                className={`w-20 h-1 mx-2 ${step >= 2 ? "bg-indigo-600" : "bg-gray-700"}`}
              ></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-400"}`}
              >
                2
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-6">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {/* Step 1: Upload Video */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Video File
                </label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors duration-200">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="video-upload"
                  />
                  <label htmlFor="video-upload" className="cursor-pointer">
                    {videoData.videoFile ?
                      <div>
                        <div className="text-green-400 mb-2">
                          <svg
                            className="w-12 h-12 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div className="text-white font-medium">
                          {videoData.videoFile.name}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {(videoData.videoFile.size / (1024 * 1024)).toFixed(
                            2,
                          )}{" "}
                          MB
                        </div>
                      </div>
                    : <div>
                        <div className="text-gray-400 mb-2">
                          <svg
                            className="w-12 h-12 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                        </div>
                        <div className="text-white font-medium">
                          Click to upload video
                        </div>
                        <div className="text-gray-400 text-sm">
                          MP4, MOV, AVI up to 500MB
                        </div>
                      </div>
                    }
                  </label>
                </div>
              </div>

              {uploadProgress > 0 && (
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={handleVideoUpload}
                  disabled={!videoData.videoFile || loading}
                  className="btn-primary"
                >
                  {loading ?
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Uploading...
                    </span>
                  : "Upload & Continue"}
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Lesson Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Lesson Title *
                </label>
                <input
                  type="text"
                  value={lessonData.title}
                  onChange={(e) =>
                    setLessonData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="input-field w-full"
                  placeholder="e.g., Introduction to React Hooks"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Short Description
                </label>
                <input
                  type="text"
                  value={lessonData.description}
                  onChange={(e) =>
                    setLessonData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="input-field w-full"
                  placeholder="Brief overview of this lesson"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Lesson Content
                </label>
                <textarea
                  value={lessonData.content}
                  onChange={(e) =>
                    setLessonData((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  className="input-field w-full min-h-[200px]"
                  placeholder="Detailed content, notes, or additional information..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Duration (seconds)
                  </label>
                  <input
                    type="number"
                    value={lessonData.duration}
                    onChange={(e) =>
                      setLessonData((prev) => ({
                        ...prev,
                        duration: parseInt(e.target.value) || 0,
                      }))
                    }
                    className="input-field w-full"
                    placeholder="600"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Order
                  </label>
                  <input
                    type="number"
                    value={lessonData.order}
                    onChange={(e) =>
                      setLessonData((prev) => ({
                        ...prev,
                        order: parseInt(e.target.value) || 0,
                      }))
                    }
                    className="input-field w-full"
                    placeholder="1"
                    min="0"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-6 border-t border-gray-700">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-secondary"
                  disabled={loading}
                >
                  ← Back
                </button>
                <button
                  onClick={handleCreateLesson}
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading ?
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Saving...
                    </span>
                  : editLessonId ?
                    "Update Lesson"
                  : "Create Lesson"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadLesson;
