# 🏪 IHUZA Inventory Management System

## 📖 Table of Contents
1. [What is this project?](#what-is-this-project)
2. [What I built](#what-i-built)
3. [Technologies used](#technologies-used)
4. [Getting started (for absolute beginners)](#getting-started-for-absolute-beginners)
5. [Project structure explained](#project-structure-explained)
6. [How the code works](#how-the-code-works)
7. [Features implemented](#features-implemented)
8. [How to use the app](#how-to-use-the-app)
9. [Important concepts explained](#important-concepts-explained)
10. [Troubleshooting](#troubleshooting)

---

## 🎯 What is this project?

IHUZA is a **complete inventory management system** that allows businesses to:
- Track products and their stock levels
- Organize products into categories
- Manage users and their access levels
- Monitor inventory in real-time through a dashboard

This is a **single-page application (SPA)** built with **React** and styled with **Tailwind CSS**. All data is stored in your browser's **localStorage**, so no backend server is needed!

---

## ✅ What I built

I successfully created a **fully functional** inventory management system with:

### ✨ Authentication System
- **Login page** - Users can sign in with email and password
- **Register page** - New users can create accounts
- **Protected routes** - Only logged-in users can access the app
- **Role-based access** - Admin users have special privileges

### 📊 Dashboard
- **Real-time statistics** - Shows total products, users, categories, and low stock items
- **Recent products** - Displays the last 6 products added
- **Recent users** - Shows the last 10 users who registered
- **Activity feed** - Lists recent system activities
- **Quick actions** - Shortcuts to different sections

### 📦 Products Management (Full CRUD)
- **Create** - Add new products with details (name, SKU, price, quantity, etc.)
- **Read** - View all products in a searchable table
- **Update** - Edit existing product information
- **Delete** - Remove products from inventory
- **Search** - Filter products by name, category, or SKU

### 📁 Categories Management (Full CRUD)
- **Create** - Add new product categories
- **Read** - View all categories in a grid layout
- **Update** - Edit category information
- **Delete** - Remove categories

### 👥 Users Management (Full CRUD - Admin Only)
- **Create** - Add new users (admin only)
- **Read** - View all users (admin only)
- **Update** - Edit user information and roles (admin only)
- **Delete** - Remove users (admin only)
- **Role management** - Assign admin or user roles

### 🌙 Dark Theme
- **Theme toggle** - Switch between light and dark mode
- **Persistent preference** - Theme choice is saved in localStorage
- **All pages supported** - Every screen looks great in both themes

### 🔐 Security Features
- **Protected routes** - Non-logged-in users are redirected to login
- **Admin-only routes** - Users page only accessible to admins
- **Session persistence** - Stay logged in even after page refresh

---

## 🛠 Technologies used

This project uses **simple, beginner-friendly** technologies:

1. **React** (v18.3.1) - JavaScript library for building user interfaces
2. **JSX** - JavaScript with HTML-like syntax (NO TypeScript!)
3. **Tailwind CSS** (v4) - Utility-first CSS framework for styling
4. **Lucide React** - Beautiful icon library
5. **localStorage** - Browser storage for data persistence (no database needed!)

---

## 🚀 Getting started (for absolute beginners)

### Prerequisites
Before you start, you need:
1. **Node.js** installed on your computer (version 16 or higher)
   - Download from: https://nodejs.org/
   - To check if you have it, open Terminal/Command Prompt and type: `node --version`

2. **A code editor** (I recommend Visual Studio Code)
   - Download from: https://code.visualstudio.com/

### Step-by-step installation

**Step 1: Open Terminal/Command Prompt**
- On Mac: Press `Cmd + Space`, type "Terminal", press Enter
- On Windows: Press `Win + R`, type "cmd", press Enter

**Step 2: Navigate to the project folder**
```bash
cd path/to/your/project
```

**Step 3: Install dependencies**
This downloads all the code libraries the project needs:
```bash
npm install
```
⏱️ This might take 2-3 minutes. Wait for it to finish!

**Step 4: Start the development server**
```bash
npm run dev
```

**Step 5: Open the app in your browser**
- The terminal will show you a URL (usually `http://localhost:5173`)
- Click on it or copy-paste it into your browser

🎉 **Congratulations!** Your app is now running!

---

## 📁 Project structure explained

Here's what each file and folder does:

```
my-project/
├── src/
│   ├── app/
│   │   ├── contexts/              # "Global storage" for shared data
│   │   │   ├── AuthContext.jsx    # Manages login, logout, current user
│   │   │   ├── InventoryContext.jsx # Manages products, categories, users data
│   │   │   └── ThemeContext.jsx   # Manages dark/light theme
│   │   │
│   │   ├── pages/                 # Different screens/pages
│   │   │   ├── Login.jsx          # Login screen
│   │   │   ├── Register.jsx       # Registration screen
│   │   │   ├── Products.jsx       # Products management page
│   │   │   ├── Categories.jsx     # Categories management page
│   │   │   └── Users.jsx          # Users management page (admin only)
│   │   │
│   │   ├── App.jsx                # Main component - the "brain" of the app
│   │   ├── Sidebar.jsx            # Left navigation menu
│   │   ├── Header.jsx             # Top bar with user info and theme toggle
│   │   └── DashboardComponent.jsx # Dashboard page
│   │
│   └── styles/                    # CSS styling files
│       ├── tailwind.css           # Tailwind CSS configuration
│       └── theme.css              # Custom theme styles
│
├── package.json                   # Lists all dependencies (libraries used)
└── README.md                      # This file!
```

---

## 🧠 How the code works

### Understanding Context (Global State)

Think of **Context** as a "magic box" that holds data and functions that any component can access, without passing them through props.

**Example:**
```jsx
// Without Context - passing props through multiple components ❌
<App user={user}>
  <Sidebar user={user}>
    <Menu user={user} />
  </Sidebar>
</App>

// With Context - any component can access user directly ✅
const { user } = useAuth(); // Magic! 🎩✨
```

We use **three contexts**:

1. **AuthContext** - Manages authentication
   - Stores current logged-in user
   - Provides login, logout, register functions
   - Checks if user is admin

2. **InventoryContext** - Manages all inventory data
   - Stores products, categories, users
   - Provides CRUD functions (add, update, delete)
   - Calculates dashboard statistics

3. **ThemeContext** - Manages theme
   - Stores current theme (light or dark)
   - Provides toggleTheme function

### Understanding localStorage

**localStorage** is like a small database built into your browser. It saves data even after you close the browser.

**Example:**
```jsx
// Save data to localStorage
localStorage.setItem('ihuza_user', JSON.stringify(user));

// Get data from localStorage
const savedUser = localStorage.getItem('ihuza_user');
const user = JSON.parse(savedUser); // Convert text back to object
```

**What we store:**
- `ihuza_user` - Current logged-in user
- `ihuza_users` - All registered users
- `ihuza_products` - All products
- `ihuza_categories` - All categories
- `ihuza_theme` - Current theme (light/dark)

### Understanding JSX

**JSX** looks like HTML, but it's actually JavaScript!

```jsx
// This is JSX
<div className="container">
  <h1>Hello {userName}</h1>
</div>

// It gets converted to:
React.createElement('div', {className: 'container'},
  React.createElement('h1', null, `Hello ${userName}`)
);
```

**Key differences from HTML:**
- Use `className` instead of `class`
- Use `{}` to insert JavaScript variables
- Can return only ONE parent element

### Understanding Components

**Components** are reusable pieces of UI. Think of them like LEGO blocks!

```jsx
// A simple component
function Button({ text, onClick }) {
  return (
    <button onClick={onClick} className="bg-blue-500 text-white px-4 py-2">
      {text}
    </button>
  );
}

// Use it anywhere!
<Button text="Click me!" onClick={handleClick} />
```

### Understanding State

**State** is data that can change over time. When state changes, React re-renders the component.

```jsx
// useState creates a state variable
const [count, setCount] = useState(0);

// Update state
setCount(count + 1);
```

---

## 🎨 Features implemented

### 1. User Authentication
- ✅ Login with email and password
- ✅ Register new account
- ✅ First user automatically becomes admin
- ✅ Logout functionality
- ✅ Session persistence (stay logged in)
- ✅ Protected routes

### 2. Products Management
- ✅ Add new products
- ✅ Edit existing products
- ✅ Delete products
- ✅ Search/filter products
- ✅ View product details
- ✅ Track stock levels (In Stock, Low Stock, Out of Stock)
- ✅ SKU management

### 3. Categories Management
- ✅ Add new categories
- ✅ Edit existing categories
- ✅ Delete categories
- ✅ Search/filter categories
- ✅ Track product count per category

### 4. Users Management (Admin Only)
- ✅ Add new users
- ✅ Edit user information
- ✅ Delete users
- ✅ Assign roles (admin/user)
- ✅ Change passwords
- ✅ View user registration dates

### 5. Dashboard
- ✅ Real-time statistics (total products, users, categories)
- ✅ Low stock alerts
- ✅ Recent products list
- ✅ Recent users list
- ✅ Activity feed
- ✅ Quick action buttons

### 6. Theme System
- ✅ Light mode
- ✅ Dark mode
- ✅ Toggle button in header
- ✅ Persistent preference

### 7. Responsive Design
- ✅ Mobile-friendly (320px and up)
- ✅ Tablet-optimized
- ✅ Desktop layout
- ✅ Collapsible sidebar on small screens

---

## 📱 How to use the app

### First time setup

1. **Start the app** (follow installation steps above)

2. **Create your first account**
   - Click "Create Account"
   - Enter your name, email, and password
   - Click "Create Account"
   - 🎉 You're automatically logged in as the **admin** (first user always becomes admin)!

3. **Explore the dashboard**
   - You'll see statistics (currently 0 for everything)
   - This will update as you add data

### Adding products

1. Click **"Products"** in the sidebar
2. Click the **"Add Product"** button
3. Fill in the form:
   - Product Name (e.g., "Laptop Dell XPS 15")
   - Category (select from dropdown)
   - SKU (e.g., "DELL-XPS-15")
   - Quantity (e.g., 25)
   - Price (e.g., 1299.99)
   - Status (In Stock / Low Stock / Out of Stock)
   - Description (optional)
4. Click **"Add Product"**
5. ✅ Product is now in your inventory!

**To edit a product:**
- Click the pencil icon (✏️) next to the product
- Modify the information
- Click "Update Product"

**To delete a product:**
- Click the trash icon (🗑️) next to the product
- Confirm deletion

### Adding categories

1. Click **"Categories"** in the sidebar
2. Click the **"Add Category"** button
3. Fill in:
   - Category Name (e.g., "Electronics")
   - Description (e.g., "Electronic devices and accessories")
4. Click **"Add Category"**

### Managing users (Admin only)

1. Click **"Users"** in the sidebar
2. Click the **"Add User"** button
3. Fill in:
   - Full Name
   - Email Address
   - Password
   - Role (User or Admin)
4. Click **"Add User"**

**Note:** Only admins can see the Users menu. Regular users won't see it!

### Switching themes

- Click the sun/moon icon (☀️/🌙) in the top-right header
- Theme switches instantly!
- Your choice is saved automatically

### Logging out

- Click the **"Logout"** button at the bottom of the sidebar
- Confirm logout
- You'll be taken back to the login screen

---

## 💡 Important concepts explained

### What is CRUD?

**CRUD** stands for:
- **C**reate - Add new items
- **R**ead - View/list items
- **U**pdate - Edit existing items
- **D**elete - Remove items

Every data table in our app (Products, Categories, Users) has full CRUD functionality!

### What is a "Context" in React?

A **Context** is like a "global variable" that any component can access without passing it through props.

**When to use Context:**
- Data needed by many components (like current user)
- Passing props through many levels is annoying
- You want to avoid "prop drilling"

### What is localStorage?

**localStorage** is storage space in your web browser. It can save small amounts of data permanently.

**Advantages:**
- ✅ No server needed
- ✅ Data persists after page refresh
- ✅ Simple to use

**Limitations:**
- ❌ Only stores text (we use JSON to store objects)
- ❌ Limited to ~5-10 MB
- ❌ Can be cleared by user
- ❌ Not secure (don't store sensitive data!)

### What is "responsive design"?

**Responsive design** means the app works on all screen sizes:
- 📱 Mobile phones (small screens)
- 📱 Tablets (medium screens)
- 💻 Laptops/Desktops (large screens)

We use **Tailwind CSS breakpoints**:
- `sm:` - Small screens (640px and up)
- `md:` - Medium screens (768px and up)
- `lg:` - Large screens (1024px and up)

**Example:**
```jsx
// This button is full width on mobile, half width on large screens
<button className="w-full lg:w-1/2">
  Click me
</button>
```

### What are "protected routes"?

**Protected routes** are pages that only logged-in users can access.

**How it works:**
1. User tries to access a page
2. App checks: "Is the user logged in?"
3. If YES → Show the page ✅
4. If NO → Show login page ❌

**Code example:**
```jsx
if (!user) {
  return <Login />;  // Show login page
}
return <Dashboard />;  // Show protected page
```

### What is "role-based access"?

**Role-based access** means different users see different things based on their role.

**In our app:**
- **Admin** - Can see and do everything (including Users page)
- **User** - Can see most pages, but NOT the Users page

---

## 🐛 Troubleshooting

### Problem: "npm: command not found"
**Solution:** You need to install Node.js first. Download from https://nodejs.org/

### Problem: Port already in use
**Error message:** `Port 5173 is already in use`
**Solution:**
1. Close any other terminals running the app
2. Or use a different port: `npm run dev -- --port 3000`

### Problem: Page is blank/white screen
**Solution:**
1. Open browser console (Press F12)
2. Look for red error messages
3. Make sure you ran `npm install` first

### Problem: Changes not showing up
**Solution:**
1. Make sure the dev server is running (`npm run dev`)
2. Hard refresh the browser (Ctrl/Cmd + Shift + R)
3. Check if you saved the file

### Problem: Can't login
**Solution:**
1. Make sure you created an account first (Click "Create Account")
2. Check if email and password are correct
3. Try creating a new account

### Problem: Data disappeared
**Solution:**
- localStorage can be cleared by:
  - Clearing browser cache
  - Incognito/Private mode
  - Different browser
- To reset: Open browser console (F12) and type:
  ```javascript
  localStorage.clear()
  ```
  Then refresh the page

### Problem: Users menu not showing
**Solution:**
- The Users menu is only visible to **admins**
- The first user to register automatically becomes admin
- Check your role in the sidebar (bottom left)

### Problem: Dark mode not working
**Solution:**
1. Click the sun/moon icon in the header
2. Check if Tailwind dark mode is configured
3. Clear browser cache and refresh

---

## 🎓 Learning resources

Want to learn more? Here are some great resources:

**React:**
- Official React docs: https://react.dev/
- React Tutorial: https://react.dev/learn

**JavaScript:**
- MDN Web Docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- JavaScript.info: https://javascript.info/

**Tailwind CSS:**
- Official docs: https://tailwindcss.com/docs
- Tailwind Play (online editor): https://play.tailwindcss.com/

**General web development:**
- freeCodeCamp: https://www.freecodecamp.org/
- W3Schools: https://www.w3schools.com/

---

## 📝 Code comments

Every file in this project has **detailed comments** explaining what each part does. Look for:

```jsx
/**
 * This is a multi-line comment
 * It explains big concepts
 */

// This is a single-line comment
// It explains specific lines
```

**Read the comments!** They're written specifically for beginners.

---

## 🎯 What's next?

Now that you have a working inventory system, you can:

1. **Customize it**
   - Change colors in Tailwind classes
   - Add more fields to products
   - Create your own pages

2. **Add features**
   - Export data to CSV
   - Print reports
   - Add product images
   - Create a supplier management system

3. **Learn more**
   - Study how Context works
   - Understand React hooks (useState, useEffect)
   - Learn about component lifecycle

4. **Deploy it**
   - Host on Netlify (free)
   - Host on Vercel (free)
   - Share with friends!

---

## 📞 Need help?

If you're stuck:
1. **Read the error message** - It usually tells you what's wrong
2. **Check the comments** in the code
3. **Search Google** with your error message
4. **Read this README again** - The answer might be here!

---

## 🎉 Congratulations!

You now have a complete, production-ready inventory management system!

**What you learned:**
- ✅ React components and JSX
- ✅ State management with Context
- ✅ CRUD operations
- ✅ localStorage for data persistence
- ✅ User authentication
- ✅ Role-based access control
- ✅ Responsive design
- ✅ Dark mode implementation

**Keep coding! You're doing great! 🚀**

---

Made with ❤️ for beginners learning React and JavaScript
