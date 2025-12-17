// import { useAuth } from "../context/AuthContext";

const Header = () => {
  // const { user, logout } = useAuth();

  return (
    <header className="flex justify-between items-center bg-white shadow p-4 ml-64">
      {/* <h1 className="text-xl font-bold">Welcome, {user.name}</h1> */}
      <div className="flex items-center gap-4">
        <img
          src={"/default-avatar.png"}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
