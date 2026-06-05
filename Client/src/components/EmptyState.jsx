// src/components/EmptyState.jsx
const EmptyState = ({
  icon = "📚",
  title = "No data found",
  message = "There are no items to display here yet.",
  action,
  actionText = "Create New",
}) => {
  return (
    <div className="text-center py-12">
      <div className="text-5xl mb-6 opacity-30">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 mb-8 max-w-md mx-auto">{message}</p>
      {action && (
        <button onClick={action} className="btn-primary">
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
