import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsSun, BsMoon, BsListTask, BsGrid } from 'react-icons/bs';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="nav-link">
              Dashboard
            </Link>
            <Link to="/tasks" className="nav-link">
              Tasks
            </Link>
            <Link to="/projects" className="nav-link">
              Projects
            </Link>
            <Link to="/calendar" className="nav-link">
              Calendar
            </Link>
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
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                alt="Profile"
                className="w-8 h-8 rounded-full bg-white"
              />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <BsGrid className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute inset-x-0 top-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <div className="flex flex-col space-y-1 px-4 py-3">
            <Link to="/" className="mobile-nav-link">
              Dashboard
            </Link>
            <Link to="/tasks" className="mobile-nav-link">
              Tasks
            </Link>
            <Link to="/projects" className="mobile-nav-link">
              Projects
            </Link>
            <Link to="/calendar" className="mobile-nav-link">
              Calendar
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;