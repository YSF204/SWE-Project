import { createContext, useContext, useState } from 'react';

// Create Auth Context
const AuthContext = createContext(null);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password, role) => {
    // Minimal login logic - in real app, this would call an API
    const userData = {
      email,
      role, // 'admin' or 'customer'
      isAuthenticated: true
    };
    setUser(userData);
    return userData;
  };

  const logout = () => {
    setUser(null);
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const isCustomer = () => {
    return user?.role === 'customer';
  };

  const isAuthenticated = () => {
    return user?.isAuthenticated === true;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAdmin, 
      isCustomer, 
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Protected Route Component - Only authenticated users can access
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return (
      <div style={styles.accessDenied}>
        <h2>Access Denied</h2>
        <p>Please login to access this page</p>
      </div>
    );
  }

  return children;
};

// Admin Only Route Component
export const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated()) {
    return (
      <div style={styles.accessDenied}>
        <h2>Access Denied</h2>
        <p>Please login to access this page</p>
      </div>
    );
  }

  if (!isAdmin()) {
    return (
      <div style={styles.accessDenied}>
        <h2>Admin Access Required</h2>
        <p>You do not have permission to access this page</p>
      </div>
    );
  }

  return children;
};

// Customer Only Route Component
export const CustomerRoute = ({ children }) => {
  const { isAuthenticated, isCustomer } = useAuth();

  if (!isAuthenticated()) {
    return (
      <div style={styles.accessDenied}>
        <h2>Access Denied</h2>
        <p>Please login to access this page</p>
      </div>
    );
  }

  if (!isCustomer()) {
    return (
      <div style={styles.accessDenied}>
        <h2>Customer Access Required</h2>
        <p>This page is only accessible to customers</p>
      </div>
    );
  }

  return children;
};

// Demo Component to show how it works
export const RBACDemo = () => {
  const { user, login, logout, isAdmin, isCustomer } = useAuth();

  const handleAdminLogin = () => {
    login('admin@example.com', 'password', 'admin');
  };

  const handleCustomerLogin = () => {
    login('customer@example.com', 'password', 'customer');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Role-Based Access Control Demo</h2>
        
        {user ? (
          <div>
            <div style={styles.userInfo}>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>Is Admin:</strong> {isAdmin() ? 'Yes' : 'No'}</p>
              <p><strong>Is Customer:</strong> {isCustomer() ? 'Yes' : 'No'}</p>
            </div>
            <button onClick={logout} style={styles.logoutButton}>
              Logout
            </button>
          </div>
        ) : (
          <div style={styles.loginButtons}>
            <button onClick={handleAdminLogin} style={styles.adminButton}>
              Login as Admin
            </button>
            <button onClick={handleCustomerLogin} style={styles.customerButton}>
              Login as Customer
            </button>
          </div>
        )}

        <div style={styles.info}>
          <h3>How to Use:</h3>
          <ol style={styles.list}>
            <li>Wrap your app with <code>&lt;AuthProvider&gt;</code></li>
            <li>Use <code>useAuth()</code> hook to access auth functions</li>
            <li>Use <code>&lt;ProtectedRoute&gt;</code> for authenticated users</li>
            <li>Use <code>&lt;AdminRoute&gt;</code> for admin-only pages</li>
            <li>Use <code>&lt;CustomerRoute&gt;</code> for customer-only pages</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px'
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '500px'
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333'
  },
  userInfo: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '4px',
    marginBottom: '20px'
  },
  loginButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '30px'
  },
  adminButton: {
    padding: '12px',
    fontSize: '16px',
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#dc3545',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  customerButton: {
    padding: '12px',
    fontSize: '16px',
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  logoutButton: {
    padding: '12px',
    fontSize: '16px',
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#6c757d',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%'
  },
  accessDenied: {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: '#fff3cd',
    borderRadius: '8px',
    margin: '20px'
  },
  info: {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: '#e7f3ff',
    borderRadius: '4px'
  },
  list: {
    textAlign: 'left',
    fontSize: '14px',
    lineHeight: '1.8'
  }
};

export default RBACDemo;
