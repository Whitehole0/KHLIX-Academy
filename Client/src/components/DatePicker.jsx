// src/components/DatePicker.jsx
import { useState, useRef, useEffect } from "react";

const DatePicker = ({
  value,
  onChange,
  minDate,
  maxDate,
  placeholder = "Select date",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(
    value ? new Date(value) : new Date(),
  );
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getMonthDays = () => {
    const days = [];
    const firstDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1,
    ).getDay();
    const totalDays = daysInMonth(currentMonth);

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of month
    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }

    return days;
  };

  const handleDateClick = (day) => {
    if (!day) return;

    const selectedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );

    if (minDate && selectedDate < new Date(minDate)) return;
    if (maxDate && selectedDate > new Date(maxDate)) return;

    onChange(selectedDate.toISOString().split("T")[0]);
    setIsOpen(false);
  };

  const isSelected = (day) => {
    if (!value || !day) return false;
    const date = new Date(value);
    return (
      date.getDate() === day &&
      date.getMonth() === currentMonth.getMonth() &&
      date.getFullYear() === currentMonth.getFullYear()
    );
  };

  const isDisabled = (day) => {
    if (!day) return true;
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    if (minDate && date < new Date(minDate)) return true;
    if (maxDate && date > new Date(maxDate)) return true;
    return false;
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const changeMonth = (delta) => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + delta, 1),
    );
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div
        className="input-field w-full cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-white" : "text-gray-400"}>
          {value ? formatDisplayDate(value) : placeholder}
        </span>
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-72 bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
          <div className="p-4">
            {/* Month selector */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => changeMonth(-1)}
                className="p-1 hover:bg-gray-700 rounded"
              >
                ←
              </button>
              <div className="text-white font-medium">
                {monthNames[currentMonth.getMonth()]}{" "}
                {currentMonth.getFullYear()}
              </div>
              <button
                onClick={() => changeMonth(1)}
                className="p-1 hover:bg-gray-700 rounded"
              >
                →
              </button>
            </div>

            {/* Week days */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-gray-400"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-1">
              {getMonthDays().map((day, index) => (
                <button
                  key={index}
                  onClick={() => handleDateClick(day)}
                  disabled={isDisabled(day)}
                  className={`
                    p-2 text-sm rounded-lg transition-colors
                    ${!day ? "invisible" : ""}
                    ${isSelected(day) ? "bg-indigo-600 text-white" : "text-gray-300 hover:bg-gray-700"}
                    ${isDisabled(day) ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
