import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { InventoryProvider } from './contexts/InventoryContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Sidebar from './Sidebar';
import Header from './Header';
import DashboardComponent from './DashboardComponent';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Users from './pages/Users';

/**
 * ===========================================
 * MAIN APP COMPONENT
 * ===========================================
 * This is the root component that:
 * 1. Wraps everything in Context Providers (Auth, Inventory, Theme)
 * 2. Handles routing between pages
 * 3. Protects routes (only logged-in users can access)
 * 4. Shows Login/Register for non-authenticated users
 * 
 * BEGINNER NOTE: Think of this as the "brain" of your app.
 * It decides what to show based on whether the user is logged in.
 */

export default function App() {
  return (
    // Wrap entire app in providers so all components can access:
    // - Authentication (login, logout, current user)
    // - Inventory data (products, categories, users)
    // - Theme (dark/light mode)
    <ThemeProvider>
      <AuthProvider>
        <InventoryProvider>
          <AppContent />
        </InventoryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

/**
 * APP CONTENT COMPONENT
 * This component has access to all contexts
 * It decides what to show based on auth state
 */
function AppContent() {
  // Get current user from Auth Context
  const { user, isAdmin } = useAuth();
  
  // STATE: Which page is currently active
  const [activePage, setActivePage] = useState('Dashboard');
  
  // STATE: Are we showing Login or Register?
  const [showRegister, setShowRegister] = useState(false);

  /**
   * IF USER IS NOT LOGGED IN
   * Show Login or Register page
   */
  if (!user) {
    return showRegister ? (
      <Register onSwitchToLogin={() => setShowRegister(false)} />
    ) : (
      <Login onSwitchToRegister={() => setShowRegister(true)} />
    );
  }

  /**
   * IF USER IS LOGGED IN
   * Show the main app with sidebar and content
   */
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* ============================================ */}
      {/* SIDEBAR - Navigation */}
      {/* ============================================ */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      
      {/* ============================================ */}
      {/* MAIN CONTENT AREA */}
      {/* ============================================ */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header activePage={activePage} />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <PageContent 
            activePage={activePage} 
            setActivePage={setActivePage}
            isAdmin={isAdmin()} 
          />
        </main>
      </div>
    </div>
  );
}

/**
 * PAGE CONTENT COMPONENT
 * Renders the correct page based on activePage state
 * PROTECTED ROUTES: Users page only accessible to admins
 */
function PageContent({ activePage, setActivePage, isAdmin }) {
  // Render the appropriate page component
  switch (activePage) {
    case 'Dashboard':
      return <DashboardComponent setActivePage={setActivePage} />;
    
    case 'Products':
      return <Products />;
    
    case 'Categories':
      return <Categories />;
    
    case 'Assignments':
      return <Assignments />;
    
    case 'Users':
      // ADMIN-ONLY ROUTE
      // If user is not admin, show access denied message
      if (!isAdmin) {
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-6xl mb-4">🔒</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Access Denied
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Only administrators can access this page.
              </p>
            </div>
          </div>
        );
      }
      return <Users />;
    
    default:
      return <DashboardComponent setActivePage={setActivePage} />;
  }
}

/**
 * ASSIGNMENTS PAGE COMPONENT
 * Placeholder for product assignments management
 * TODO: Implement full assignments functionality
 */
function Assignments() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Product Assignments
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage product assignments to users
        </p>
      </div>

      {/* Coming Soon Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-12 border border-gray-200 dark:border-gray-700 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg 
              className="w-10 h-10 text-purple-600 dark:text-purple-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" 
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Assignments Coming Soon
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This feature will allow you to assign products to users and track product allocation across your organization.
          </p>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-left">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Planned Features:
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Assign products to specific users</li>
              <li>• Track assignment history</li>
              <li>• View product allocation by user</li>
              <li>• Generate assignment reports</li>
              <li>• Manage returns and reassignments</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}