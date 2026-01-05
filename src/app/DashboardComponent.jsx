import { useNavigate } from 'react-router-dom';
import { useInventory } from './contexts/InventoryContext';
import { useAuth } from './contexts/AuthContext';
import {
  Users,
  Package,
  List,
  Plus,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Layers,
  User,
  CircleCheckBig,
} from 'lucide-react';
import { toast } from 'sonner';

export default function DashboardComponent() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-4 sm:space-y-6">
      <SystemOverview userName={user?.name} />
      <StatsCards />
      <RecentProducts />
      {isAdmin() && <RecentUsersTable />}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <RecentActivity />
        <QuickActions />
      </div>
    </div>
  );
}

function SystemOverview({ userName }) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-xl p-4 sm:p-6 text-white shadow-lg">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0 border-2 border-white/20">
          <Package className="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow-lg" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-base sm:text-lg font-semibold mb-1">
            iHUZA INVENTORY - System Overview
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm mb-2 sm:mb-3">
            Monitor your iHUZA inventory and product assignments in real-time.
          </p>
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <CircleCheckBig className="w-4 h-4 sm:w-5 sm:h-5 text-green-300 flex-shrink-0" />
            <span className="text-blue-100">All Systems Operational</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsCards() {
  const { getDashboardStats } = useInventory();
  const stats = getDashboardStats();
  const { isAdmin } = useAuth();

  const statsCards = [
    {
      label: 'Total Users',
      value: stats.totalUsers.toString(),
      icon: Users,
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
      show: isAdmin(),
    },
    {
      label: 'Total Products',
      value: stats.totalProducts.toString(),
      icon: Package,
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
      show: true,
    },
    {
      label: 'Assigned Products',
      value: '10',
      icon: CircleCheckBig,
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-600 dark:text-green-400',
      show: true,
    },
    {
      label: 'Unassigned Products',
      value: stats.lowStockProducts.toString(),
      icon: AlertTriangle,
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      show: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {statsCards.filter(stat => stat.show).map((stat) => (
        <div
          key={stat.label}
          className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 lg:p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-col gap-2 sm:gap-3">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
              <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.iconColor}`} />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function RecentProducts() {
  const { products } = useInventory();

  const recentProducts = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Out of Stock':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
          Recent Added Products
        </h3>
      </div>
      <div className="p-4 sm:p-6">
        {recentProducts.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <Package className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-500 dark:text-gray-400">No products yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {recentProducts.map((product) => (
              <div
                key={product.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer"
              >
                <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-1 truncate">
                  {product.name}
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 truncate">
                  {product.category}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 sm:mb-3">
                  {new Date(product.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
                <span className={`inline-block text-xs px-2 sm:px-2.5 py-1 rounded-md ${getStatusColor(product.status)}`}>
                  {product.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function RecentUsersTable() {
  const { users, deleteUser } = useInventory();
  const { isUserActive, user: currentUser } = useAuth();
  const navigate = useNavigate();

  const recentUsers = [...users]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10);

  const getTimeAgo = (dateString) => {
    if (!dateString) return 'Never';

    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMs / 3600000);
    const diffInDays = Math.floor(diffInMs / 86400000);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 14) return '1 week ago';
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  const handleDelete = (userId, userName) => {
    // Prevent deleting yourself
    if (userId === currentUser.id) {
      toast.error('Cannot delete your own account', {
        description: 'You cannot delete the account you are currently logged in with'
      });
      return;
    }

    toast.custom((t) => (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Delete User</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Are you sure you want to delete "{userName}"? This action cannot be undone.
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
                deleteUser(userId);
                toast.dismiss(t);
              }}
              className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ), {
      duration: Infinity,
    });
  };

  const getUserStatus = (user) => {
    if (!user.lastLogin) {
      return { isActive: false, label: 'Inactive' };
    }

    const active = isUserActive(user.lastLogin);
    return {
      isActive: active,
      label: active ? 'Active' : 'Inactive'
    };
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Users</h3>
        <button
          onClick={() => navigate('/users')}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Add User</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">User</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase hidden sm:table-cell">Role</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase hidden lg:table-cell">Last Login</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 sm:px-6 py-8 sm:py-12 text-center">
                  <Users className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">No users yet</p>
                </td>
              </tr>
            ) : (
              recentUsers.map((user) => {
                const status = getUserStatus(user);
                return (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap hidden sm:table-cell">
                      <span className={`text-xs font-medium px-2 sm:px-3 py-1 rounded-full capitalize ${user.role === 'admin'
                          ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                          : user.role === 'manager'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <span className={`text-xs font-medium px-2 sm:px-3 py-1 rounded-full ${status.isActive
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 dark:text-gray-400 hidden lg:table-cell">
                      {getTimeAgo(user.lastLogin)}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <button
                          onClick={() => navigate('/users')}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.id, user.name)}
                          className="text-red-600 dark:text-red-400 hover:text-red-700 font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RecentActivity() {
  const { products } = useInventory();

  const activities = [];

  const recentProducts = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
  recentProducts.forEach((product) => {
    activities.push({
      title: 'Product added to inventory',
      description: `${product.name} - ${product.sku} (${product.id})`,
      date: new Date(product.createdAt),
      dateStr: new Date(product.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      icon: Package,
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
    });
  });

  activities.sort((a, b) => b.date - a.date);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
        <button className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium">
          View all
        </button>
      </div>
      <div className="p-4 sm:p-6">
        {activities.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <Package className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-500 dark:text-gray-400">No activity yet</p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start gap-2 sm:gap-3">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 ${activity.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <activity.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${activity.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{activity.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">{activity.description}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{activity.dateStr}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function QuickActions() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const allActions = [
    {
      title: 'View Users',
      description: 'View all registered users',
      icon: Users,
      path: '/users',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      adminOnly: true,
    },
    {
      title: 'View Products',
      description: 'View all registered products',
      icon: Package,
      path: '/products',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      adminOnly: false,
    },
    {
      title: 'View Assignments',
      description: 'View all product assignments',
      icon: List,
      path: '/assignments',
      iconBg: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
      adminOnly: false,
    },
  ];

  const actions = allActions.filter(action => !action.adminOnly || isAdmin());

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Quick Actions</h3>
      </div>
      <div className="p-4 sm:p-6">
        <div className="space-y-2 sm:space-y-3">
          {actions.map((action, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 ${action.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <action.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${action.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate">{action.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">{action.description}</p>
                </div>
              </div>
              <button
                onClick={() => navigate(action.path)}
                className={`ml-2 sm:ml-4 px-3 sm:px-4 py-1.5 sm:py-2 ${action.buttonColor} text-white text-xs sm:text-sm font-medium rounded-lg transition-colors flex-shrink-0`}
              >
                Go
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}