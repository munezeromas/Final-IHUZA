import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

const InventoryContext = createContext();

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within InventoryProvider');
  }
  return context;
};

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
    userId: 'admin',
    createdAt: new Date().toISOString(),
  },
];

const initialCategories = [
  {
    id: '1',
    name: 'Electronics',
    description: 'Electronic devices and accessories',
    productCount: 120,
    userId: 'admin',
    createdAt: new Date().toISOString(),
  },
];

export const InventoryProvider = ({ children }) => {
  const { user, isAdmin } = useAuth();
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [users, setUsers] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('ihuza_products');
    if (savedProducts) {
      setAllProducts(JSON.parse(savedProducts));
    } else {
      setAllProducts(initialProducts);
      localStorage.setItem('ihuza_products', JSON.stringify(initialProducts));
    }

    const savedCategories = localStorage.getItem('ihuza_categories');
    if (savedCategories) {
      setAllCategories(JSON.parse(savedCategories));
    } else {
      setAllCategories(initialCategories);
      localStorage.setItem('ihuza_categories', JSON.stringify(initialCategories));
    }

    const savedUsers = localStorage.getItem('ihuza_users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  // ============================================
  // CRITICAL: DATA FILTERING BY USER
  // ============================================
  // Admin sees ALL data
  // Regular users see ONLY their own data
  const products = isAdmin() 
    ? allProducts 
    : allProducts.filter(p => p.userId === user?.id);

  const categories = isAdmin() 
    ? allCategories 
    : allCategories.filter(c => c.userId === user?.id);


  const addProduct = (productData) => {
    try {
      const newProduct = {
        id: Date.now().toString(),
        ...productData,
        userId: user?.id, // CRITICAL: Assign to current user
        createdAt: new Date().toISOString(),
      };
      
      const updatedProducts = [...allProducts, newProduct];
      setAllProducts(updatedProducts);
      localStorage.setItem('ihuza_products', JSON.stringify(updatedProducts));
      
      toast.success('Product added successfully', {
        description: `${productData.name} has been added to inventory`
      });
      
      return newProduct;
    } catch (error) {
      toast.error('Failed to add product', {
        description: 'Please try again'
      });
      return null;
    }
  };

  const updateProduct = (id, productData) => {
    try {
      const product = allProducts.find(p => p.id === id);
      
      // SECURITY CHECK: Only allow if admin OR owner
      if (!isAdmin() && product?.userId !== user?.id) {
        toast.error('Permission denied', {
          description: 'You cannot update this product'
        });
        return;
      }

      const updatedProducts = allProducts.map((product) =>
        product.id === id ? { ...product, ...productData } : product
      );
      
      setAllProducts(updatedProducts);
      localStorage.setItem('ihuza_products', JSON.stringify(updatedProducts));
      
      toast.success('Product updated successfully', {
        description: `${productData.name} has been updated`
      });
    } catch (error) {
      toast.error('Failed to update product', {
        description: 'Please try again'
      });
    }
  };

  const deleteProduct = (id) => {
    try {
      const product = allProducts.find(p => p.id === id);
      
      // SECURITY CHECK: Only allow if admin OR owner
      if (!isAdmin() && product?.userId !== user?.id) {
        toast.error('Permission denied', {
          description: 'You cannot delete this product'
        });
        return;
      }

      const updatedProducts = allProducts.filter((product) => product.id !== id);
      setAllProducts(updatedProducts);
      localStorage.setItem('ihuza_products', JSON.stringify(updatedProducts));
      
      toast.success('Product deleted successfully', {
        description: `${product.name} has been removed from inventory`
      });
    } catch (error) {
      toast.error('Failed to delete product', {
        description: 'Please try again'
      });
    }
  };

  const getProductById = (id) => {
    const product = allProducts.find((product) => product.id === id);
    
    // SECURITY CHECK: Only return if admin OR owner
    if (!isAdmin() && product?.userId !== user?.id) {
      return null;
    }
    return product;
  };

  const addCategory = (categoryData) => {
    try {
      const newCategory = {
        id: Date.now().toString(),
        ...categoryData,
        productCount: 0,
        userId: user?.id, 
        createdAt: new Date().toISOString(),
      };
      
      const updatedCategories = [...allCategories, newCategory];
      setAllCategories(updatedCategories);
      localStorage.setItem('ihuza_categories', JSON.stringify(updatedCategories));
      
      toast.success('Category added successfully', {
        description: `${categoryData.name} has been created`
      });
      
      return newCategory;
    } catch (error) {
      toast.error('Failed to add category', {
        description: 'Please try again'
      });
      return null;
    }
  };

  const updateCategory = (id, categoryData) => {
    try {
      const category = allCategories.find(c => c.id === id);
      
      // SECURITY CHECK: Only allow if admin OR owner
      if (!isAdmin() && category?.userId !== user?.id) {
        toast.error('Permission denied', {
          description: 'You cannot update this category'
        });
        return;
      }

      const updatedCategories = allCategories.map((category) =>
        category.id === id ? { ...category, ...categoryData } : category
      );
      
      setAllCategories(updatedCategories);
      localStorage.setItem('ihuza_categories', JSON.stringify(updatedCategories));
      
      toast.success('Category updated successfully', {
        description: `${categoryData.name} has been updated`
      });
    } catch (error) {
      toast.error('Failed to update category', {
        description: 'Please try again'
      });
    }
  };

  const deleteCategory = (id) => {
    try {
      const category = allCategories.find(c => c.id === id);
      
      // SECURITY CHECK: Only allow if admin OR owner
      if (!isAdmin() && category?.userId !== user?.id) {
        toast.error('Permission denied', {
          description: 'You cannot delete this category'
        });
        return;
      }

      const updatedCategories = allCategories.filter((category) => category.id !== id);
      setAllCategories(updatedCategories);
      localStorage.setItem('ihuza_categories', JSON.stringify(updatedCategories));
      
      toast.success('Category deleted successfully', {
        description: `${category.name} has been removed`
      });
    } catch (error) {
      toast.error('Failed to delete category', {
        description: 'Please try again'
      });
    }
  };

  const getCategoryById = (id) => {
    const category = allCategories.find((category) => category.id === id);
    
    // SECURITY CHECK: Only return if admin OR owner
    if (!isAdmin() && category?.userId !== user?.id) {
      return null;
    }
    return category;
  };


  const addUser = (userData) => {
    if (!isAdmin()) {
      toast.error('Permission denied', {
        description: 'Only admins can add users'
      });
      return;
    }

    try {
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString(),
      };
      
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem('ihuza_users', JSON.stringify(updatedUsers));
      
      toast.success('User added successfully', {
        description: `${userData.name} has been added to the system`
      });
      
      return newUser;
    } catch (error) {
      toast.error('Failed to add user', {
        description: 'Please try again'
      });
      return null;
    }
  };

  const updateUser = (id, userData) => {
    if (!isAdmin()) {
      toast.error('Permission denied', {
        description: 'Only admins can update users'
      });
      return;
    }

    try {
      const updatedUsers = users.map((user) =>
        user.id === id ? { ...user, ...userData } : user
      );
      
      setUsers(updatedUsers);
      localStorage.setItem('ihuza_users', JSON.stringify(updatedUsers));
      
      toast.success('User updated successfully', {
        description: `${userData.name} has been updated`
      });
    } catch (error) {
      toast.error('Failed to update user', {
        description: 'Please try again'
      });
    }
  };

  const deleteUser = (id) => {
    if (!isAdmin()) {
      toast.error('Permission denied', {
        description: 'Only admins can delete users'
      });
      return;
    }

    try {
      const user = users.find(u => u.id === id);
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
      localStorage.setItem('ihuza_users', JSON.stringify(updatedUsers));
      
      toast.success('User deleted successfully', {
        description: `${user.name} has been removed from the system`
      });
    } catch (error) {
      toast.error('Failed to delete user', {
        description: 'Please try again'
      });
    }
  };

  const getUserById = (id) => {
    if (!isAdmin()) {
      toast.error('Permission denied', {
        description: 'Only admins can view user details'
      });
      return null;
    }
    return users.find((user) => user.id === id);
  };

  const refreshUsers = () => {
    if (!isAdmin()) return;
    
    const savedUsers = localStorage.getItem('ihuza_users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  };


  const getDashboardStats = () => {
    // Stats are based on filtered products/categories (user's own data)
    const totalProducts = products.length;
    const lowStockProducts = products.filter((p) => p.quantity < 10).length;
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    
    return {
      totalProducts,
      totalCategories: categories.length,
      totalUsers: isAdmin() ? users.length : 0, // Only admins see user count
      lowStockProducts,
      totalValue,
    };
  };

  const value = {
    // Filtered data (user's own or all if admin)
    products,
    categories,
    users: isAdmin() ? users : [], // Only admins see users
    
    // Product operations
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    
    // Category operations
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
    
    // User operations (admin only)
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
