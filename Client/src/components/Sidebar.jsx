import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Students", path: "/admin/students" },
    { name: "Courses", path: "/admin/courses" },
    { name: "Live Sessions", path: "/admin/live-sessions" },
    { name: "Settings", path: "/admin/settings" },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen fixed">
      <div className="p-6 font-bold text-2xl border-b border-gray-700">
        Admin Panel
      </div>
      <nav className="mt-4">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `block p-4 hover:bg-gray-700 transition-colors rounded ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
