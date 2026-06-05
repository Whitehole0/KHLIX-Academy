// src/components/Skeleton.jsx
const Skeleton = ({ type = "text", count = 1, className = "" }) => {
  const baseClass = "animate-pulse bg-gray-800 rounded";

  const types = {
    text: "h-4 w-full",
    title: "h-8 w-3/4",
    avatar: "h-12 w-12 rounded-full",
    image: "h-48 w-full",
    card: "h-64 w-full rounded-xl",
    button: "h-10 w-24 rounded-lg",
    input: "h-12 w-full rounded-lg",
    chart: "h-64 w-full rounded-lg",
  };

  const renderSkeleton = (key) => (
    <div key={key} className={`${baseClass} ${types[type]} ${className}`} />
  );

  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => renderSkeleton(index))}
    </div>
  );
};

export default Skeleton;
