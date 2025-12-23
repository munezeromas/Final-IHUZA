import { useAuth } from './contexts/AuthContext';
import { useTheme } from './contexts/ThemeContext';
import { Bell, Settings, Sun, Moon } from 'lucide-react';

/**
 * ===========================================
 * HEADER COMPONENT
 * ===========================================
 * Top navigation bar with title, theme toggle, and user info
 * Shows current user's name and email
 * Provides dark/light theme toggle
 */

export default function Header({ activePage }) {
  // Get current user from auth context
  const { user } = useAuth();
  
  // Get theme and toggle function from theme context
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* ============================================ */}
        {/* LEFT SIDE - Page Title */}
        {/* ============================================ */}
        <div>
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            {activePage || 'Dashboard'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Welcome back, {user?.name || 'User'}
          </p>
        </div>
        
        {/* ============================================ */}
        {/* RIGHT SIDE - Actions and User Profile */}
        {/* ============================================ */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme toggle button */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            )}
          </button>
          
          {/* Settings button */}
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors hidden sm:block">
            <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
          </button>
          
          {/* Notification bell with badge */}
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative hidden sm:block">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* User profile */}
          <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-gray-200 dark:border-gray-700">
            <div className="hidden md:block text-right">
              <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                {user?.name || 'User'}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {user?.email || 'user@example.com'}
              </div>
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {user?.name?.charAt(0) || 'U'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
