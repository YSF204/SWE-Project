import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import UserRegistration from './auth/UserRegistration';
import Login from './auth/login';
import CRUDforCategories from './admin/CRUDforCategories';
import ViewAllProducts from './customer/View-all-products';
import './App.css';

const Navigation = ({ currentPage, setCurrentPage }) => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="nav-logo">E-Commerce</h1>
        
        <div className="nav-links">
          {user ? (
            <>
              <span className="user-badge">
                {user.name} • {user.role}
              </span>
              
              {isAdmin() && (
                <button 
                  onClick={() => setCurrentPage('admin')}
                  className={currentPage === 'admin' ? 'nav-btn active' : 'nav-btn'}
                >
                  Admin
                </button>
              )}
              
              <button 
                onClick={() => setCurrentPage('products')}
                className={currentPage === 'products' ? 'nav-btn active' : 'nav-btn'}
              >
                Products
              </button>
              
              <button onClick={logout} className="nav-btn logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setCurrentPage('login')}
                className={currentPage === 'login' ? 'nav-btn active' : 'nav-btn'}
              >
                Login
              </button>
              <button 
                onClick={() => setCurrentPage('register')}
                className={currentPage === 'register' ? 'nav-btn active' : 'nav-btn'}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const AppContent = () => {
  const { user, isAdmin, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  const renderPage = () => {
    if (!user) {
      if (currentPage === 'register') return <UserRegistration />;
      return <Login />;
    }

    switch (currentPage) {
      case 'admin':
        return isAdmin() ? <CRUDforCategories /> : <ViewAllProducts />;
      case 'products':
        return <ViewAllProducts />;
      case 'home':
      default:
        return (
          <div className="home-container">
            <div className="home-content">
              <h1 className="home-title">Welcome to E-Commerce</h1>
              <p className="home-subtitle">
                {isAdmin() 
                  ? 'Manage your store from the Admin Dashboard' 
                  : 'Discover amazing products in our catalog'}
              </p>
              <div className="home-actions">
                {isAdmin() && (
                  <button onClick={() => setCurrentPage('admin')} className="home-btn primary">
                    Admin Dashboard
                  </button>
                )}
                <button onClick={() => setCurrentPage('products')} className="home-btn secondary">
                  Browse Products
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="app-wrapper">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
