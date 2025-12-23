import { useAuth } from './contexts/AuthContext';
import { 
  Laptop,
  Users, 
  Package, 
  FolderTree,
  LogOut,
  Monitor,
Layers
} from 'lucide-react';

/**
 * ===========================================
 * SIDEBAR COMPONENT
 * ===========================================
 * Left navigation panel with route links
 * Shows/hides Users menu based on admin role
 */

export default function Sidebar({ activePage, setActivePage }) {
  // Get current user and logout function from auth context
  const { user, logout, isAdmin } = useAuth();

  // Menu items - Users only visible to admins
  const menuItems = [
    { name: 'Dashboard', icon: Laptop, count: null, adminOnly: false },
    { name: 'Products', icon: Package, count: null, adminOnly: false },
    { name: 'Categories', icon: Layers, count: null, adminOnly: false },
    { name: 'Users', icon: Users, count: null, adminOnly: true }, // Admin only!
  ];

  // Filter menu items based on user role
  const visibleMenuItems = menuItems.filter((item) => !item.adminOnly || isAdmin());

  /**
   * HANDLE LOGOUT
   * Logs out the user
   */
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <div className="w-16 sm:w-20 lg:w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* ============================================ */}
      {/* LOGO SECTION */}
      {/* ============================================ */}
      <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Package Laptop className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="hidden lg:block">
            <div className="font-semibold text-gray-900 dark:text-white">IHUZA</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">INVENTORY</div>
          </div>
        </div>
      </div>
      
      {/* ============================================ */}
      {/* NAVIGATION MENU */}
      {/* ============================================ */}
      <nav className="flex-1 p-2 sm:p-3 lg:p-4">
        {visibleMenuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActivePage(item.name)}
            className={`w-full flex items-center justify-center lg:justify-between px-2 sm:px-3 py-2 sm:py-2.5 mb-1 rounded-lg transition-colors ${
              activePage === item.name
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }`}
            title={item.name}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="hidden lg:block">{item.name}</span>
            </div>
            {item.count && (
              <span className="hidden lg:block text-xs text-gray-400 dark:text-gray-500">
                {item.count}
              </span>
            )}
          </button>
        ))}
      </nav>
      
      {/* ============================================ */}
      {/* USER INFO & LOGOUT */}
      {/* ============================================ */}
      <div className="p-2 sm:p-3 lg:p-4 border-t border-gray-200 dark:border-gray-700">
        {/* User info - only visible on large screens */}
        <div className="hidden lg:block mb-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-medium">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user?.name || 'User'}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {user?.role || 'user'}
              </div>
            </div>
          </div>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center lg:justify-start gap-3 px-2 sm:px-3 py-2 sm:py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          title="Logout"
        >
          <LogOut className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          <span className="hidden lg:block">Logout</span>
        </button>
      </div>
    </div>
  );
}
