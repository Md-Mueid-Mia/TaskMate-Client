import { useState, useEffect } from "react";
import { BsSun, BsMoon, BsListTask, BsGrid } from "react-icons/bs";
import useAuth from "../Hooks/useAuth";
import { useTheme } from "../Context/ThemeContext";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const [isDarkTheme, setIsDarkTheme] = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const handleLogOut = async () => {
    try {
      await signOutUser();
      window.location.href = "/login";
      toast.success("Logout Successful");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(isDarkTheme);
  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md ${
      isDarkTheme 
        ? 'bg-gray-900/80 border-gray-800' 
        : 'bg-white/80 border-gray-200'
    } border-b transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2">
            <BsListTask className={`h-6 w-6 ${
              isDarkTheme ? 'text-blue-400' : 'text-blue-600'
            }`} />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TaskMate
            </span>
          </div>

          {/* Right Side Items */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDarkTheme(!isDarkTheme)}
              className={`p-2 rounded-full transition-colors ${
                isDarkTheme 
                  ? 'hover:bg-gray-800 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
              aria-label="Toggle theme"
            >
              {isDarkTheme ? (
                <BsSun className="h-5 w-5 text-yellow-500" />
              ) : (
                <BsMoon className="h-5 w-5" />
              )}
            </button>

            {/* Profile Button */}
            <button className="flex items-center gap-2 p-1.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <img
                src={user?.photoURL || "https://avatars.dicebear.com/api/avataaars/anonymous.svg"}
                alt="Profile"
                className="w-8 h-8 rounded-full bg-white"
              />
            </button>
            {user && (
              <button
                onClick={handleLogOut}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  isDarkTheme
                    ? 'text-red-400 hover:bg-red-900/20'
                    : 'text-red-500 hover:bg-red-50'
                }`}
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


