// src/pages/student/Lesson.jsx
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// import ReactPlayer from "react-player";
import { lessonsAPI } from "../../utils/api";

const StudentLesson = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextLesson, setNextLesson] = useState(null);
  const [prevLesson, setPrevLesson] = useState(null);

  useEffect(() => {
    fetchLesson();
  }, [lessonId]);

  const fetchLesson = async () => {
    try {
      setLoading(true);
      // Note: This endpoint would need to be added to the API
      // For now, we'll fetch all lessons and find the current one
      const response = await lessonsAPI.getCourseLessons(lessonId);
      const lessons = response.data.lessons || [];
      const currentLesson = lessons.find((l) => l._id === lessonId);

      if (currentLesson) {
        setLesson(currentLesson);

        const currentIndex = lessons.findIndex((l) => l._id === lessonId);
        if (currentIndex > 0) {
          setPrevLesson(lessons[currentIndex - 1]);
        }
        if (currentIndex < lessons.length - 1) {
          setNextLesson(lessons[currentIndex + 1]);
        }
      } else {
        setError("Lesson not found");
      }
    } catch (err) {
      setError("Failed to load lesson");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-3/4 mb-4"></div>
            <div className="h-[480px] bg-gray-800 rounded-xl mb-6"></div>
            <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-800 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-indigo-400 hover:text-indigo-300 mb-4 inline-flex items-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Course
          </button>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-6">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {lesson && (
          <>
            <div className="card mb-8">
              <h1 className="text-2xl font-bold text-white mb-4">
                {lesson.title}
              </h1>

              <div className="aspect-video bg-black rounded-lg overflow-hidden mb-6">
                {lesson.videoUrl ?
                  <ReactPlayer
                    url={lesson.videoUrl}
                    controls
                    width="100%"
                    height="100%"
                    config={{
                      file: {
                        attributes: {
                          controlsList: "nodownload",
                        },
                      },
                    }}
                  />
                : <div className="h-full flex items-center justify-center text-gray-400">
                    <svg
                      className="w-16 h-16"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                }
              </div>

              <div className="prose prose-invert max-w-none">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Lesson Content
                </h3>
                <p className="text-gray-300">
                  {lesson.content || "No additional content provided."}
                </p>
              </div>
            </div>

            <div className="flex justify-between">
              {prevLesson ?
                <Link
                  to={`/student/lesson/${prevLesson._id}`}
                  className="btn-secondary flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Previous Lesson
                </Link>
              : <div></div>}

              {nextLesson ?
                <Link
                  to={`/student/lesson/${nextLesson._id}`}
                  className="btn-primary flex items-center"
                >
                  Next Lesson
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              : <button onClick={() => navigate(-1)} className="btn-primary">
                  Complete Course
                </button>
              }
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentLesson;
