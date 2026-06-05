// src/components/Tooltip.jsx
import { useState, useRef, useEffect } from "react";

const Tooltip = ({ children, content, position = "top" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);
  const targetRef = useRef(null);

  useEffect(() => {
    const updatePosition = () => {
      if (!tooltipRef.current || !targetRef.current) return;

      const targetRect = targetRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let top = 0;
      let left = 0;

      switch (position) {
        case "top":
          top = targetRect.top - tooltipRect.height - 8;
          left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
          break;
        case "bottom":
          top = targetRect.bottom + 8;
          left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
          break;
        case "left":
          top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
          left = targetRect.left - tooltipRect.width - 8;
          break;
        case "right":
          top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
          left = targetRect.right + 8;
          break;
      }

      tooltipRef.current.style.top = `${top}px`;
      tooltipRef.current.style.left = `${left}px`;
    };

    if (isVisible) {
      updatePosition();
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);
    }

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isVisible, position]);

  return (
    <>
      <div
        ref={targetRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-block"
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          className="fixed z-50 px-3 py-2 text-sm bg-gray-800 text-white rounded-lg shadow-xl border border-gray-700 whitespace-nowrap"
        >
          {content}
          <div
            className={`absolute w-2 h-2 bg-gray-800 border-gray-700 transform rotate-45 ${
              position === "top" ?
                "bottom-[-5px] left-1/2 -translate-x-1/2 border-b border-r"
              : position === "bottom" ?
                "top-[-5px] left-1/2 -translate-x-1/2 border-t border-l"
              : position === "left" ?
                "right-[-5px] top-1/2 -translate-y-1/2 border-t border-r"
              : "left-[-5px] top-1/2 -translate-y-1/2 border-b border-l"
            }`}
          />
        </div>
      )}
    </>
  );
};

export default Tooltip;
