// src/components/Breadcrumb.jsx
import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex mb-6" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link to="/" className="text-gray-400 hover:text-white text-sm">
            Home
          </Link>
        </li>

        {items.map((item, index) => (
          <li key={index}>
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-gray-400 mx-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {item.path ?
                <Link
                  to={item.path}
                  className="text-gray-400 hover:text-white text-sm"
                >
                  {item.label}
                </Link>
              : <span className="text-indigo-400 text-sm">{item.label}</span>}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
