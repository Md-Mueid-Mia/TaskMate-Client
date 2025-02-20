import { useState, useEffect } from "react";
import { BsSun, BsMoon, BsListTask, BsGrid } from "react-icons/bs";
import useAuth from "../Hooks/useAuth";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  const handleLogOut = async () => {
    try {
      await signOutUser();
      window.location.href = "/login";
      toast.success("Logout Successful");
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(user);
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2">
            <BsListTask className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TaskMate
            </span>
          </div>

          {/* Right Side Items */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <BsSun className="h-5 w-5 text-yellow-500" />
              ) : (
                <BsMoon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>

            {/* Profile Button */}
            <button className="flex items-center gap-2 p-1.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <img
                src={
                  user
                    ? user?.photoURL
                    : "https://avatars.dicebear.com/api/avataaars/anonymous.svg"
                }
                alt="Profile"
                className="w-8 h-8 rounded-full bg-white"
              />
            </button>
            {user && (
              <button
                onClick={handleLogOut}
                className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
