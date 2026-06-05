// src/components/Chart.jsx
import { useEffect, useRef } from "react";

const Chart = ({ type = "line", data, options = {} }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !data) return;

    const ctx = canvasRef.current.getContext("2d");
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set up colors based on dark mode
    const colors = {
      grid: "#374151",
      text: "#9CA3AF",
      line: "#6366F1",
      area: "rgba(99, 102, 241, 0.1)",
      point: "#818CF8",
    };

    // Calculate dimensions
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Find min/max values
    const values = data.datasets[0].data;
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);

    // Draw grid
    ctx.strokeStyle = colors.grid;
    ctx.lineWidth = 0.5;

    // Horizontal grid lines
    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
      const y = padding + (chartHeight / gridLines) * i;

      ctx.beginPath();
      ctx.strokeStyle = colors.grid;
      ctx.lineWidth = 0.5;
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();

      // Value labels
      const value = maxValue - (maxValue - minValue) * (i / gridLines);
      ctx.fillStyle = colors.text;
      ctx.font = "10px Inter, sans-serif";
      ctx.fillText(Math.round(value), 10, y + 4);
    }

    // Draw axes
    ctx.strokeStyle = colors.text;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw line/bar chart
    if (type === "line") {
      ctx.beginPath();
      ctx.strokeStyle = colors.line;
      ctx.lineWidth = 2;

      values.forEach((value, index) => {
        const x = padding + (chartWidth / (values.length - 1)) * index;
        const y =
          padding +
          chartHeight -
          (chartHeight * (value - minValue)) / (maxValue - minValue);

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();

      // Draw area under the line
      ctx.fillStyle = colors.area;
      ctx.beginPath();
      values.forEach((value, index) => {
        const x = padding + (chartWidth / (values.length - 1)) * index;
        const y =
          padding +
          chartHeight -
          (chartHeight * (value - minValue)) / (maxValue - minValue);

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.lineTo(width - padding, height - padding);
      ctx.lineTo(padding, height - padding);
      ctx.closePath();
      ctx.fill();

      // Draw points
      values.forEach((value, index) => {
        const x = padding + (chartWidth / (values.length - 1)) * index;
        const y =
          padding +
          chartHeight -
          (chartHeight * (value - minValue)) / (maxValue - minValue);

        ctx.beginPath();
        ctx.fillStyle = colors.point;
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();

        // Add label
        ctx.fillStyle = colors.text;
        ctx.font = "10px Inter, sans-serif";
        ctx.fillText(data.labels[index], x - 15, height - padding + 20);
      });
    } else if (type === "bar") {
      const barWidth = (chartWidth / values.length) * 0.7;

      values.forEach((value, index) => {
        const x =
          padding +
          (chartWidth / values.length) * index +
          (chartWidth / values.length - barWidth) / 2;
        const barHeight = (chartHeight * value) / maxValue;

        ctx.fillStyle = colors.line;
        ctx.fillRect(x, height - padding - barHeight, barWidth, barHeight);

        // Add label
        ctx.fillStyle = colors.text;
        ctx.font = "10px Inter, sans-serif";
        ctx.fillText(data.labels[index], x, height - padding + 20);
      });
    }
  }, [data, type]);

  return (
    <div className="w-full h-full min-h-[300px] bg-gray-800 rounded-lg p-4">
      <canvas
        ref={canvasRef}
        width={600}
        height={300}
        className="w-full h-full"
      />
    </div>
  );
};

export default Chart;
