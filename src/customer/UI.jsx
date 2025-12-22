import React, { useState } from 'react';

const CustomerUI = () => {
    // Mock data for products
    const [products] = useState([
        { id: 1, name: 'Smartphone', price: 699, category: 'Electronics', image: '📱' },
        { id: 2, name: 'Laptop', price: 999, category: 'Electronics', image: '💻' },
        { id: 3, name: 'T-Shirt', price: 20, category: 'Clothing', image: '👕' },
        { id: 4, name: 'Jeans', price: 40, category: 'Clothing', image: '👖' },
        { id: 5, name: 'Coffee Maker', price: 50, category: 'Home', image: '☕' },
        { id: 6, name: 'Book: sci-fi', price: 15, category: 'Books', image: '📖' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Electronics', 'Clothing', 'Home', 'Books'];

    // Filter products based on search and category
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <header style={{ marginBottom: '30px', textAlign: 'center' }}>
                <h1>Welcome to Our Store</h1>
                <p>Find the best products at the best prices</p>
            </header>

            {/* Search and Filter Section */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                marginBottom: '30px',
                flexWrap: 'wrap'
            }}>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
                />

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Product Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '20px',
                margin: '0 auto',
                maxWidth: '1200px'
            }}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <div key={product.id} className="product-card" style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '20px',
                            textAlign: 'center',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                            backgroundColor: '#fff',
                            color: '#333'
                        }}>
                            <div style={{ fontSize: '40px', marginBottom: '10px' }}>{product.image}</div>
                            <h3 style={{ margin: '10px 0' }}>{product.name}</h3>
                            <p style={{ color: '#666', fontSize: '0.9em' }}>{product.category}</p>
                            <p style={{ fontWeight: 'bold', fontSize: '1.2em', color: '#27ae60' }}>
                                ${product.price}
                            </p>
                            <button style={{
                                padding: '10px 20px',
                                backgroundColor: '#3498db',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                marginTop: '10px'
                            }}>
                                Add to Cart
                            </button>
                        </div>
                    ))
                ) : (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '20px' }}>
                        <h3>No products found matching your criteria.</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerUI;