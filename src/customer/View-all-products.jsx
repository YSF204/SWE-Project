import { useState, useEffect } from 'react';
import api from '../services/api';
import './Customer.css';

const ViewAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        api.getProducts(),
        api.getCategories()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || 
                           product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="customer-container">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="customer-container">
      <div className="customer-wrapper">
        <h1 className="customer-title">Product Catalog</h1>

        <div className="filter-card">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="category-filter">
            <label>Filter by Category:</label>
            <div className="category-buttons">
              <button
                onClick={() => setSelectedCategory('All')}
                className={selectedCategory === 'All' ? 'category-btn active' : 'category-btn'}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={selectedCategory === category.name ? 'category-btn active' : 'category-btn'}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="results-count">
          Showing {filteredProducts.length} of {products.length} products
        </div>

        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <p>No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-header">
                  <h3 className="product-name">{product.name}</h3>
                  <span className="category-badge">{product.category}</span>
                </div>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                  <span className="product-price">${product.price}</span>
                  <button className="btn-view">View Details</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAllProducts;
