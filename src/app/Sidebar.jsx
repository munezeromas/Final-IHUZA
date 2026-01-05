import { useAuth } from './contexts/AuthContext';
import { useInventory } from './contexts/InventoryContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Laptop,
  Users, 
  Package, 
  LogOut,
  Layers,
  AlignLeft,
} from 'lucide-react';
import { toast } from 'sonner';

export default function Sidebar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get data from inventory context with safe defaults
  let products = [];
  let categories = [];
  let users = [];

  try {
    const inventory = useInventory();
    products = inventory.products || [];
    categories = inventory.categories || [];
    users = inventory.users || [];
  } catch (error) {
    console.error('Error loading inventory data:', error);
  }

  // Menu items configuration with counts
  const menuItems = [
    { 
      name: 'Dashboard', 
      icon: Laptop, 
      path: '/dashboard', 
      count: null,
      adminOnly: false 
    },
    { 
      name: 'Users', 
      icon: Users, 
      path: '/users', 
      count: users.length,
      adminOnly: true 
    },
    { 
      name: 'Products', 
      icon: Package, 
      path: '/products', 
      count: products.length,
      adminOnly: false 
    },
    { 
      name: 'Assignments', 
      icon: AlignLeft, 
      path: '/assignments', 
      count: 10,
      adminOnly: false 
    },
    { 
      name: 'Categories', 
      icon: Layers, 
      path: '/categories', 
      count: categories.length,
      adminOnly: false 
    },
  ];

  // Filter menu items based on user role
  const visibleMenuItems = menuItems.filter((item) => {
    if (item.adminOnly) {
      return isAdmin ? isAdmin() : false;
    }
    return true;
  });

  const handleLogout = () => {
    toast.custom((t) => (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Logout</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Are you sure you want to logout?
            </p>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                toast.dismiss(t);
              }}
              className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                logout();
                toast.dismiss(t);
                toast.success('Logged out successfully', {
                  description: 'See you soon!'
                });
                navigate('/login');
              }}
              className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    ), {
      duration: Infinity,
    });
  };

  // Check if current route matches the menu item path
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-16 sm:w-20 lg:w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
      {/* LOGO SECTION */}
      <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Package className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="hidden lg:block">
            <div className="font-semibold text-gray-900 dark:text-white">iHUZA</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">INVENTORY</div>
          </div>
        </div>
      </div>
      
      {/* NAVIGATION MENU - Scrollable */}
      <nav className="flex-1 p-2 sm:p-3 lg:p-4 overflow-y-auto overflow-x-hidden min-h-0">
        {visibleMenuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center justify-between px-3 py-2.5 mb-1 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }`}
            title={item.name}
          >
            {/* Left side: Icon and Name */}
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="hidden lg:block text-sm font-medium">{item.name}</span>
            </div>
            
            {/* Right side: Count with gray rounded background badge */}
            {item.count !== null && (
              <span className="hidden lg:block px-2.5 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-full ml-auto">
                {item.count}
              </span>
            )}
          </button>
        ))}
      </nav>
      
      {/* USER INFO & LOGOUT - Fixed at bottom */}
      <div className="p-2 sm:p-3 lg:p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 bg-white dark:bg-gray-800">
        {/* User info - only visible on large screens */}
        <div className="hidden lg:block mb-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-medium">
              {user && user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user && user.name ? user.name : 'User'}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {user && user.role ? user.role : 'user'}
              </div>
            </div>
          </div>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center lg:justify-start gap-3 px-3 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors font-medium"
          title="Logout"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span className="hidden lg:block text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}