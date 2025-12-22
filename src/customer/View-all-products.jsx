import { useState } from 'react';

const ViewAllProducts = () => {
  // Sample products data with categories
  const [products] = useState([
    { id: 1, name: 'Laptop', category: 'Electronics', price: 999, description: 'High-performance laptop' },
    { id: 2, name: 'Smartphone', category: 'Electronics', price: 699, description: 'Latest smartphone model' },
    { id: 3, name: 'T-Shirt', category: 'Clothing', price: 29, description: 'Cotton t-shirt' },
    { id: 4, name: 'Jeans', category: 'Clothing', price: 59, description: 'Denim jeans' },
    { id: 5, name: 'Novel Book', category: 'Books', price: 15, description: 'Bestselling novel' },
    { id: 6, name: 'Headphones', category: 'Electronics', price: 149, description: 'Wireless headphones' },
    { id: 7, name: 'Jacket', category: 'Clothing', price: 89, description: 'Winter jacket' },
    { id: 8, name: 'Textbook', category: 'Books', price: 45, description: 'Educational textbook' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get unique categories
  const categories = ['All', ...new Set(products.map(p => p.category))];

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <h1 style={styles.title}>Product Catalog</h1>

        {/* Search and Filter Section */}
        <div style={styles.filterSection}>
          {/* Search Bar */}
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          {/* Category Filter */}
          <div style={styles.categoryFilter}>
            <label style={styles.filterLabel}>Filter by Category:</label>
            <div style={styles.categoryButtons}>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    ...styles.categoryButton,
                    ...(selectedCategory === category ? styles.categoryButtonActive : {})
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div style={styles.resultsCount}>
          Showing {filteredProducts.length} of {products.length} products
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div style={styles.emptyMessage}>
            <p>No products found matching your criteria.</p>
          </div>
        ) : (
          <div style={styles.productsGrid}>
            {filteredProducts.map(product => (
              <div key={product.id} style={styles.productCard}>
                <div style={styles.productHeader}>
                  <h3 style={styles.productName}>{product.name}</h3>
                  <span style={styles.categoryBadge}>{product.category}</span>
                </div>
                <p style={styles.productDescription}>{product.description}</p>
                <div style={styles.productFooter}>
                  <span style={styles.price}>${product.price}</span>
                  <button style={styles.viewButton}>View Details</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px'
  },
  wrapper: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px',
    fontSize: '32px'
  },
  filterSection: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    marginBottom: '25px'
  },
  searchContainer: {
    marginBottom: '20px'
  },
  searchInput: {
    width: '100%',
    padding: '12px 15px',
    fontSize: '16px',
    border: '2px solid #ddd',
    borderRadius: '4px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  categoryFilter: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  filterLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#555'
  },
  categoryButtons: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  categoryButton: {
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#555',
    backgroundColor: '#f0f0f0',
    border: '2px solid #ddd',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  categoryButtonActive: {
    backgroundColor: '#007bff',
    color: 'white',
    borderColor: '#007bff'
  },
  resultsCount: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '15px',
    fontWeight: '500'
  },
  emptyMessage: {
    backgroundColor: 'white',
    padding: '60px 20px',
    borderRadius: '8px',
    textAlign: 'center',
    color: '#999',
    fontSize: '18px'
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px'
  },
  productCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer'
  },
  productHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '10px',
    gap: '10px'
  },
  productName: {
    margin: 0,
    fontSize: '18px',
    color: '#333',
    flex: 1
  },
  categoryBadge: {
    fontSize: '12px',
    padding: '4px 10px',
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    borderRadius: '12px',
    fontWeight: '500',
    whiteSpace: 'nowrap'
  },
  productDescription: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '15px',
    flex: 1
  },
  productFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto'
  },
  price: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#28a745'
  },
  viewButton: {
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default ViewAllProducts;
