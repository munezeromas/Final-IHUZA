import { createContext, useContext, useState, useEffect } from 'react';

/**
 * ===========================================
 * INVENTORY CONTEXT
 * ===========================================
 * This manages all inventory data: Products, Categories, and Users
 * Provides CRUD operations (Create, Read, Update, Delete)
 * Stores everything in localStorage for persistence
 */

// Create the context
const InventoryContext = createContext();

/**
 * CUSTOM HOOK to use Inventory Context
 * Usage: const { products, addProduct, updateProduct } = useInventory();
 */
export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within InventoryProvider');
  }
  return context;
};

/**
 * INITIAL SAMPLE DATA
 * These are default items that appear when the app first loads
 */
const initialProducts = [
  {
    id: '1',
    name: 'Laptop Dell XPS 15',
    category: 'Electronics',
    quantity: 25,
    price: 1299.99,
    status: 'In Stock',
    sku: 'DELL-XPS-15',
    description: 'High-performance laptop for professionals',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Office Chair Pro',
    category: 'Furniture',
    quantity: 50,
    price: 299.99,
    status: 'In Stock',
    sku: 'CHAIR-PRO-001',
    description: 'Ergonomic office chair with lumbar support',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Wireless Mouse',
    category: 'Electronics',
    quantity: 5,
    price: 29.99,
    status: 'Low Stock',
    sku: 'MOUSE-WIRE-001',
    description: 'Ergonomic wireless mouse with long battery life',
    createdAt: new Date().toISOString(),
  },
];

const initialCategories = [
  {
    id: '1',
    name: 'Electronics',
    description: 'Electronic devices and accessories',
    productCount: 120,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Furniture',
    description: 'Office and home furniture',
    productCount: 45,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Stationery',
    description: 'Office supplies and stationery',
    productCount: 15,
    createdAt: new Date().toISOString(),
  },
];

/**
 * INVENTORY PROVIDER COMPONENT
 * Wraps the app and provides inventory data to all components
 */
export const InventoryProvider = ({ children }) => {
  // ============================================
  // STATE: Store products, categories, and users
  // ============================================
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  /**
   * EFFECT: Load data from localStorage when app starts
   * If no data exists, use initial sample data
   */
  useEffect(() => {
    // Load products
    const savedProducts = localStorage.getItem('ihuza_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // First time - save initial data
      setProducts(initialProducts);
      localStorage.setItem('ihuza_products', JSON.stringify(initialProducts));
    }

    // Load categories
    const savedCategories = localStorage.getItem('ihuza_categories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      setCategories(initialCategories);
      localStorage.setItem('ihuza_categories', JSON.stringify(initialCategories));
    }

    // Load users (from the auth users list)
    const savedUsers = localStorage.getItem('ihuza_users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []); // Run once on mount

  // ============================================
  // PRODUCTS CRUD OPERATIONS
  // ============================================

  /**
   * ADD PRODUCT
   * Creates a new product and saves to localStorage
   */
  const addProduct = (productData) => {
    const newProduct = {
      id: Date.now().toString(), // Generate unique ID
      ...productData,
      createdAt: new Date().toISOString(),
    };
    
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('ihuza_products', JSON.stringify(updatedProducts));
    return newProduct;
  };

  /**
   * UPDATE PRODUCT
   * Updates an existing product by ID
   */
  const updateProduct = (id, productData) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, ...productData } : product
    );
    
    setProducts(updatedProducts);
    localStorage.setItem('ihuza_products', JSON.stringify(updatedProducts));
  };

  /**
   * DELETE PRODUCT
   * Removes a product by ID
   */
  const deleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('ihuza_products', JSON.stringify(updatedProducts));
  };

  /**
   * GET PRODUCT BY ID
   * Finds and returns a single product
   */
  const getProductById = (id) => {
    return products.find((product) => product.id === id);
  };

  // ============================================
  // CATEGORIES CRUD OPERATIONS
  // ============================================

  /**
   * ADD CATEGORY
   */
  const addCategory = (categoryData) => {
    const newCategory = {
      id: Date.now().toString(),
      ...categoryData,
      productCount: 0,
      createdAt: new Date().toISOString(),
    };
    
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    localStorage.setItem('ihuza_categories', JSON.stringify(updatedCategories));
    return newCategory;
  };

  /**
   * UPDATE CATEGORY
   */
  const updateCategory = (id, categoryData) => {
    const updatedCategories = categories.map((category) =>
      category.id === id ? { ...category, ...categoryData } : category
    );
    
    setCategories(updatedCategories);
    localStorage.setItem('ihuza_categories', JSON.stringify(updatedCategories));
  };

  /**
   * DELETE CATEGORY
   */
  const deleteCategory = (id) => {
    const updatedCategories = categories.filter((category) => category.id !== id);
    setCategories(updatedCategories);
    localStorage.setItem('ihuza_categories', JSON.stringify(updatedCategories));
  };

  /**
   * GET CATEGORY BY ID
   */
  const getCategoryById = (id) => {
    return categories.find((category) => category.id === id);
  };

  // ============================================
  // USERS CRUD OPERATIONS (Admin only)
  // ============================================

  /**
   * ADD USER (Admin only)
   */
  const addUser = (userData) => {
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString(),
    };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('ihuza_users', JSON.stringify(updatedUsers));
    return newUser;
  };

  /**
   * UPDATE USER (Admin only)
   */
  const updateUser = (id, userData) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, ...userData } : user
    );
    
    setUsers(updatedUsers);
    localStorage.setItem('ihuza_users', JSON.stringify(updatedUsers));
  };

  /**
   * DELETE USER (Admin only)
   */
  const deleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem('ihuza_users', JSON.stringify(updatedUsers));
  };

  /**
   * GET USER BY ID
   */
  const getUserById = (id) => {
    return users.find((user) => user.id === id);
  };

  /**
   * REFRESH USERS
   * Re-load users from localStorage (useful after updates)
   */
  const refreshUsers = () => {
    const savedUsers = localStorage.getItem('ihuza_users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  };

  // ============================================
  // STATISTICS HELPERS
  // ============================================

  /**
   * GET DASHBOARD STATS
   * Calculates summary statistics for the dashboard
   */
  const getDashboardStats = () => {
    const totalProducts = products.length;
    const lowStockProducts = products.filter((p) => p.quantity < 10).length;
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    
    return {
      totalProducts,
      totalCategories: categories.length,
      totalUsers: users.length,
      lowStockProducts,
      totalValue,
    };
  };

  // ============================================
  // VALUE: Everything we want to share
  // ============================================
  const value = {
    // Products
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    
    // Categories
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
    
    // Users
    users,
    addUser,
    updateUser,
    deleteUser,
    getUserById,
    refreshUsers,
    
    // Stats
    getDashboardStats,
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};
