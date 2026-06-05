// src/components/Toast.jsx
import { useState, useEffect } from "react";

const Toast = ({ message, type = "info", duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const bgColors = {
    success: "bg-green-900/90 border-green-700",
    error: "bg-red-900/90 border-red-700",
    warning: "bg-yellow-900/90 border-yellow-700",
    info: "bg-blue-900/90 border-blue-700",
  };

  const icons = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
  };

  return (
    <div
      className={`fixed bottom-4 right-4 max-w-sm ${bgColors[type]} border rounded-lg shadow-xl p-4 animate-slideIn`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 text-xl mr-3">{icons[type]}</div>
        <div className="flex-1">
          <p className="text-white text-sm">{message}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            onClose?.();
          }}
          className="ml-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

// Toast Manager Component
export const ToastManager = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default Toast;
