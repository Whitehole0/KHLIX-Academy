// src/components/RichTextEditor.jsx
import { useState, useRef, useEffect } from "react";

const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Write your content here...",
}) => {
  const editorRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
    if (onChange) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (onChange) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      execCommand("insertHTML", "&nbsp;&nbsp;&nbsp;&nbsp;");
    }
  };

  const toolbarButtons = [
    { icon: "B", command: "bold", label: "Bold" },
    { icon: "I", command: "italic", label: "Italic" },
    { icon: "U", command: "underline", label: "Underline" },
    { icon: "🔗", command: "createLink", prompt: true, label: "Insert Link" },
    { icon: "📷", command: "insertImage", prompt: true, label: "Insert Image" },
    { icon: "•", command: "insertUnorderedList", label: "Bullet List" },
    { icon: "1.", command: "insertOrderedList", label: "Numbered List" },
    { icon: "H1", command: "formatBlock", value: "h1", label: "Heading 1" },
    { icon: "H2", command: "formatBlock", value: "h2", label: "Heading 2" },
    { icon: "H3", command: "formatBlock", value: "h3", label: "Heading 3" },
  ];

  const handleButtonClick = (button) => {
    if (button.prompt) {
      const value = prompt(`Enter ${button.command} URL:`);
      if (value) {
        execCommand(button.command, value);
      }
    } else if (button.value) {
      execCommand(button.command, button.value);
    } else {
      execCommand(button.command);
    }
  };

  return (
    <div
      className={`border rounded-lg overflow-hidden transition-colors ${
        isFocused ?
          "border-indigo-500 ring-1 ring-indigo-500"
        : "border-gray-700"
      }`}
    >
      <div className="bg-gray-800 p-2 border-b border-gray-700 flex flex-wrap gap-1">
        {toolbarButtons.map((button, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleButtonClick(button)}
            className="px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
            title={button.label}
          >
            {button.icon}
          </button>
        ))}
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        className="p-4 min-h-[200px] focus:outline-none text-white"
        data-placeholder={placeholder}
        style={{
          backgroundColor: "#1f2937",
        }}
      />
      <style jsx>{`
        [contenteditable="true"]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
